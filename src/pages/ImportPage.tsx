import { Bot, CheckCheck, ChevronDown, FileText, Plus, RotateCcw, Save, Sparkles, Square, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { createDefaultLlmCardGenerationProvider } from '../agent/llmCardGenerationProvider'
import { createContentHash } from '../agent/contentHash'
import { LocalMarkdownProvider } from '../agent/localMarkdownProvider'
import type { GenerationEvent } from '../agent/types'
import type { CardDraft, MaterialInput } from '../domain/types'
import { ErrorState, LoadingState } from '../components/PageState'

const localProvider = new LocalMarkdownProvider()
const AI_CONSENT_VERSION = 'v0.3'

type ImportMode = 'local' | 'llm'
type GenerationProgress = {
  requestId?: string
  totalChunks: number
  completedChunks: number
  generated: number
  failedIndexes: number[]
  currentIndex?: number
}

export function ImportPage() {
  const { repository, database, refresh, revision } = useAppContext()
  const { data, loading, error } = useAsyncData(
    () => Promise.all([repository.getDrafts(), repository.getSettings(), database.cards.where('source').equals('user').toArray()]),
    revision
  )
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('粘贴内容')
  const [mode, setMode] = useState<ImportMode>('local')
  const [aiConsent, setAiConsent] = useState(false)
  const [working, setWorking] = useState(false)
  const [message, setMessage] = useState('')
  const [messageTone, setMessageTone] = useState<'success' | 'error'>('success')
  const [progress, setProgress] = useState<GenerationProgress | undefined>()
  const [lastInput, setLastInput] = useState<MaterialInput | undefined>()
  const [draftEdits, setDraftEdits] = useState<Record<string, CardDraft>>({})
  const [cancelController, setCancelController] = useState<AbortController | undefined>()

  if (loading && !data) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? '无法读取拆卡数据'} />

  const [drafts, settings, personalCards] = data
  const aiAvailable = Boolean(import.meta.env.VITE_CARD_GENERATION_API_URL) || import.meta.env.MODE === 'test'
  const consentGranted = aiConsent || settings.aiConsentVersion === AI_CONSENT_VERSION
  const visibleDrafts = drafts.map((draft) => draftEdits[draft.id] ?? draft)
  const readyCount = visibleDrafts.filter(canApprove).length
  const personalHashes = new Set(personalCards.map((card) => card.contentHash).filter(Boolean))
  const draftHashCounts = visibleDrafts.reduce((counts, draft) => {
    if (draft.contentHash) counts.set(draft.contentHash, (counts.get(draft.contentHash) ?? 0) + 1)
    return counts
  }, new Map<string, number>())

  async function generate(chunkIndexes?: number[]) {
    if (chunkIndexes?.length && !lastInput) return
    if (!chunkIndexes?.length && !content.trim()) return
    const input = chunkIndexes?.length ? lastInput! : { name: fileName, content }
    if (mode === 'llm' && !consentGranted) {
      showMessage('请先同意资料发送到拆卡服务后再生成。', 'error')
      return
    }
    setLastInput(input)
    setWorking(true)
    setMessage('')
    const controller = new AbortController()
    setCancelController(controller)
    const failed = new Set<number>(chunkIndexes ?? [])
    try {
      if (mode === 'local') {
        const generated = await localProvider.generate(input)
        await Promise.all(generated.map((draft) => repository.saveDraft(draft)))
        setContent('')
        showMessage(`已生成 ${generated.length} 张草稿`)
        refresh()
        return
      }

      const provider = createDefaultLlmCardGenerationProvider()
      let streamedDraftCount = 0
      const generated = await provider.generate(input, {
        signal: controller.signal,
        chunkIndexes,
        onEvent: async (event) => {
          await handleGenerationEvent(event, failed, (count) => { streamedDraftCount += count })
        }
      })
      if (streamedDraftCount === 0 && generated.length) {
        await Promise.all(generated.map((draft) => repository.saveDraft(draft)))
        refresh()
      }
      const failedIndexes = [...failed].sort((first, second) => first - second)
      setProgress((current) => current ? { ...current, failedIndexes, currentIndex: undefined } : undefined)
      showMessage(
        failedIndexes.length ? `已生成 ${generated.length} 张草稿，${failedIndexes.length} 个分块失败，可单独重试。` : `已生成 ${generated.length} 张 AI 草稿`
      )
      if (!failedIndexes.length) setContent('')
    } catch (generationError) {
      if (controller.signal.aborted) {
        showMessage('已取消本次 AI 拆卡，已生成的草稿仍保留。', 'error')
      } else {
        showMessage(generationError instanceof Error ? generationError.message : 'AI 拆卡失败，请稍后重试。', 'error')
      }
    } finally {
      setWorking(false)
      setCancelController(undefined)
    }

    async function handleGenerationEvent(
      event: GenerationEvent,
      failedIndexes: Set<number>,
      onDrafts: (count: number) => void
    ) {
      if (event.type === 'start') {
        setProgress({ requestId: event.requestId, totalChunks: event.totalChunks, completedChunks: 0, generated: 0, failedIndexes: [...failedIndexes] })
      }
      if (event.type === 'chunk-start') {
        setProgress((current) => current ? { ...current, currentIndex: event.index } : current)
      }
      if (event.type === 'drafts') {
        await Promise.all(event.drafts.map((draft) => repository.saveDraft(draft)))
        onDrafts(event.drafts.length)
        failedIndexes.delete(event.index)
        setProgress((current) => current ? {
          ...current,
          completedChunks: current.completedChunks + 1,
          generated: current.generated + event.drafts.length,
          failedIndexes: [...failedIndexes]
        } : current)
        refresh()
      }
      if (event.type === 'chunk-error') {
        failedIndexes.add(event.index)
        setProgress((current) => current ? {
          ...current,
          completedChunks: current.completedChunks + 1,
          failedIndexes: [...failedIndexes]
        } : current)
      }
      if (event.type === 'complete') {
        setProgress((current) => current ? { ...current, generated: Math.max(current.generated, event.generated), failedIndexes: [...failedIndexes], currentIndex: undefined } : current)
      }
    }
  }

  async function acceptConsent(checked: boolean) {
    setAiConsent(checked)
    if (checked) await repository.acceptAiConsent(AI_CONSENT_VERSION)
  }

  async function importFile(file?: File) {
    if (!file) return
    setFileName(file.name)
    setContent(await readFile(file))
  }

  function updateDraft(draft: CardDraft) {
    setDraftEdits((current) => ({ ...current, [draft.id]: draft }))
  }

  async function approveAll() {
    const readyDrafts = visibleDrafts.filter(canApprove).map((draft) => ({ ...draft, quality: 'ready' as const, updatedAt: new Date() }))
    if (!readyDrafts.length) return
    setWorking(true)
    try {
      await Promise.all(readyDrafts.map((draft) => repository.saveDraft(draft)))
      const summary = await repository.approveReadyDraftsDetailed()
      setDraftEdits({})
      showMessage(`已将 ${summary.approved.length} 张草稿加入个人资料牌组${summary.skipped ? `，跳过 ${summary.skipped} 张重复卡片` : ''}`)
      refresh()
    } finally {
      setWorking(false)
    }
  }

  function showMessage(nextMessage: string, tone: 'success' | 'error' = 'success') {
    setMessage(nextMessage)
    setMessageTone(tone)
  }

  const failedIndexes = progress?.failedIndexes ?? []
  const progressLabel = progress ? `已处理 ${progress.completedChunks} / ${progress.totalChunks} 个分块，生成 ${progress.generated} 张` : ''

  return (
    <div className="page import-page">
      <header className="page-header compact">
        <div><p className="eyebrow">MATERIAL / CARD WORKFLOW</p><h1>资料拆卡</h1><p className="page-lead">把资料整理成可审核的知识卡片草稿。</p></div>
      </header>
      <section className="import-composer">
        <div className="section-heading"><div><span className="section-index">INPUT / 01</span><h2>导入资料</h2></div><FileText size={20} /></div>
        <div className="mode-switch" role="group" aria-label="拆卡模式">
          <button className={mode === 'llm' ? 'active' : ''} onClick={() => setMode('llm')} disabled={!aiAvailable}><Bot size={16} />AI 智能拆卡</button>
          <button className={mode === 'local' ? 'active' : ''} onClick={() => setMode('local')}><Sparkles size={16} />本地规则</button>
        </div>
        {mode === 'llm' && <div className="ai-consent-box">
          <strong>资料发送说明</strong>
          <p>AI 模式会把本次资料发送到 RecallStack Worker，再转发给阿里云百炼 qwen3.7-plus。资料不会写入 Worker 数据库，生成结果仍需你审核。</p>
          <label><input type="checkbox" checked={consentGranted} disabled={settings.aiConsentVersion === AI_CONSENT_VERSION} onChange={(event) => { void acceptConsent(event.target.checked) }} />我同意将本次资料发送到 AI 拆卡服务</label>
        </div>}
        {!aiAvailable && <p className="provider-note">AI 模式尚未配置 Worker URL，当前可使用本地规则拆卡。</p>}
        <label className="material-input-label" htmlFor="material-content">资料内容</label>
        <textarea id="material-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="粘贴 Markdown 或纯文本资料" />
        <div className="import-actions">
          <label className="text-button" htmlFor="material-file"><Upload size={17} />选择 Markdown</label>
          <input id="material-file" className="backup-file-input" type="file" accept=".md,text/markdown,text/plain" aria-label="选择 Markdown 文件" onChange={(event) => { void importFile(event.target.files?.[0]); event.target.value = '' }} />
          <span className="file-name">{fileName}</span>
          {working ? <button className="text-button cancel-button" onClick={() => cancelController?.abort()}><Square size={15} />取消生成</button> : <button className="save-button" disabled={!content.trim() || mode === 'llm' && (!aiAvailable || !consentGranted)} onClick={() => void generate()}><Sparkles size={17} />{mode === 'llm' ? '生成 AI 卡片草稿' : '生成卡片草稿'}</button>}
        </div>
        {progress && mode === 'llm' && <div className="generation-progress" aria-live="polite">
          <div className="progress-line"><span>{progressLabel}</span><span>{progress.requestId ? `请求 ${progress.requestId.slice(0, 8)}` : ''}</span></div>
          <progress max={Math.max(progress.totalChunks, 1)} value={Math.min(progress.completedChunks, progress.totalChunks)} />
          {progress.currentIndex !== undefined && <span className="current-chunk">正在处理第 {progress.currentIndex + 1} 个分块</span>}
          {failedIndexes.length > 0 && lastInput && <button className="text-button retry-button" onClick={() => void generate(failedIndexes)} disabled={working}><RotateCcw size={15} />重试失败分块（{failedIndexes.length}）</button>}
        </div>}
        {message && <p className={`backup-message ${messageTone}`} role="status">{message}</p>}
      </section>
      <section className="draft-section">
        <div className="section-heading"><div><span className="section-index">REVIEW / 02</span><h2>待审核草稿</h2></div><span className="draft-count">{drafts.length} 张</span></div>
        {drafts.length ? <>
          <div className="draft-batch-bar"><span>{readyCount} 张可加入牌组</span><button className="save-button" disabled={working || readyCount === 0} onClick={() => void approveAll()}><CheckCheck size={17} />确认全部可用草稿</button></div>
          <div className="draft-list">{visibleDrafts.map((draft) => <DraftEditor key={draft.id} draft={draft} duplicate={Boolean(draft.contentHash && (personalHashes.has(draft.contentHash) || (draftHashCounts.get(draft.contentHash) ?? 0) > 1))} onChange={updateDraft} onRefresh={refresh} onMessage={showMessage} />)}</div>
        </> : <div className="empty-list"><Plus size={28} /><p>还没有草稿，从上方导入一段资料。</p></div>}
      </section>
    </div>
  )
}

function DraftEditor({ draft, duplicate, onChange, onRefresh, onMessage }: { draft: CardDraft; duplicate: boolean; onChange: (draft: CardDraft) => void; onRefresh: () => void; onMessage: (message: string, tone?: 'success' | 'error') => void }) {
  const { repository } = useAppContext()
  const fieldsComplete = isReady(draft)
  const canJoin = canApprove(draft)

  function editDraft(changes: Partial<CardDraft>) {
    onChange({ ...draft, ...changes, quality: draft.provider === 'llm' ? 'needs-review' : draft.quality })
  }

  async function save() {
    const quality = draft.provider === 'llm' ? (draft.quality === 'ready' && fieldsComplete ? 'ready' : 'needs-review') : (fieldsComplete ? 'ready' : 'needs-review')
    const contentHash = await createContentHash([draft.topic, draft.question, draft.coreAnswer])
    const next = { ...draft, contentHash, quality, updatedAt: new Date() } as CardDraft
    await repository.saveDraft(next)
    onChange(next)
    onRefresh()
    onMessage('草稿已保存')
  }

  async function completeReview() {
    if (draft.provider !== 'llm' || !fieldsComplete) return
    const contentHash = await createContentHash([draft.topic, draft.question, draft.coreAnswer])
    const next = { ...draft, contentHash, quality: 'ready' as const, updatedAt: new Date() }
    await repository.saveDraft(next)
    onChange(next)
    onRefresh()
    onMessage('AI 草稿已完成审核，可以加入个人牌组')
  }

  async function approve() {
    if (!canJoin) return
    await repository.saveDraft({ ...draft, quality: 'ready', updatedAt: new Date() })
    await repository.approveDraft(draft.id)
    onRefresh()
    onMessage('已加入个人资料牌组')
  }

  async function remove() {
    await repository.deleteDraft(draft.id)
    onRefresh()
    onMessage('草稿已删除')
  }

  return (
    <article className={`draft-card ${draft.provider === 'llm' ? 'llm-draft-card' : ''}`}>
      <div className="draft-card-header"><div><span className="topic-label">{draft.topic}</span><h3>{draft.title}</h3></div><span className={`draft-quality ${canJoin ? 'ready' : ''}`}>{draft.provider === 'llm' ? (canJoin ? '已完成审核' : '待人工审核') : (fieldsComplete ? '可确认' : '待补充')}</span></div>
      <label>问题<input value={draft.question} onChange={(event) => editDraft({ question: event.target.value })} /></label>
      <label>核心回答<textarea value={draft.coreAnswer} onChange={(event) => editDraft({ coreAnswer: event.target.value })} /></label>
      <label>回答要点<textarea value={draft.keyPoints.join('\n')} onChange={(event) => editDraft({ keyPoints: splitLines(event.target.value) })} /></label>
      <label>理解补充<textarea value={draft.explanation} onChange={(event) => editDraft({ explanation: event.target.value })} /></label>
      <div className="draft-field-grid">
        <label>关键词<textarea value={draft.tags.join('\n')} onChange={(event) => editDraft({ tags: splitLines(event.target.value) })} /></label>
        <label>延伸追问<textarea value={draft.followUps.join('\n')} onChange={(event) => editDraft({ followUps: splitLines(event.target.value) })} /></label>
      </div>
      <div className="draft-meta"><span>来源：{draft.sourceRef}</span><span>{draft.provider === 'llm' ? `${draft.model ?? '未知模型'} · ${draft.promptVersion ?? '未知提示词版本'}` : '本地规则拆卡'}</span></div>
      {draft.provider === 'llm' && <div className="draft-ai-info">
        <div className="ai-review-badges"><span className="confidence-badge">置信度 {Math.round((draft.confidence ?? 0) * 100)}%</span><span className={`duplicate-status ${duplicate ? 'duplicate' : ''}`}>{duplicate ? '检测到重复内容' : '未发现重复内容'}</span></div>
        {draft.generationNotes?.length ? <div className="generation-notes"><strong>模型提示确认</strong>{draft.generationNotes.map((note) => <p key={note}>{note}</p>)}</div> : null}
        {draft.sourceExcerpt && <details><summary>查看来源片段 <ChevronDown size={15} /></summary><blockquote>{draft.sourceExcerpt}</blockquote></details>}
      </div>}
      <div className="draft-actions"><button className="text-button" onClick={() => void remove()}><Trash2 size={16} />删除</button><button className="text-button" onClick={() => void save()}><Save size={16} />保存草稿</button>{draft.provider === 'llm' && draft.quality !== 'ready' ? <button className="save-button" disabled={!fieldsComplete} onClick={() => void completeReview()}><CheckCheck size={16} />完成审核</button> : <button className="save-button" disabled={!canJoin} onClick={() => void approve()}><Plus size={16} />加入个人牌组</button>}</div>
    </article>
  )
}

  function splitLines(value: string): string[] {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function isReady(draft: CardDraft): boolean {
  return Boolean(draft.question.trim() && draft.coreAnswer.trim())
}

function canApprove(draft: CardDraft): boolean {
  return isReady(draft) && (draft.provider !== 'llm' || draft.quality === 'ready')
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('无法读取资料'))
    reader.readAsText(file)
  })
}
