import { CheckCheck, FileText, Plus, Save, Sparkles, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { LocalMarkdownProvider } from '../agent/localMarkdownProvider'
import type { CardDraft } from '../domain/types'
import { ErrorState, LoadingState } from '../components/PageState'

const provider = new LocalMarkdownProvider()

export function ImportPage() {
  const { repository, refresh, revision } = useAppContext()
  const { data: drafts, loading, error } = useAsyncData(() => repository.getDrafts(), revision)
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('粘贴内容')
  const [working, setWorking] = useState(false)
  const [message, setMessage] = useState('')
  const [draftEdits, setDraftEdits] = useState<Record<string, CardDraft>>({})

  if (loading && !drafts) return <LoadingState />
  if (error || !drafts) return <ErrorState message={error ?? '无法读取卡片草稿'} />

  async function generate() {
    if (!content.trim()) return
    setWorking(true)
    try {
      const generated = await provider.generate({ name: fileName, content })
      await Promise.all(generated.map((draft) => repository.saveDraft(draft)))
      setContent('')
      setMessage(`已生成 ${generated.length} 张草稿`)
      refresh()
    } finally {
      setWorking(false)
    }
  }

  async function importFile(file?: File) {
    if (!file) return
    setFileName(file.name)
    setContent(await readFile(file))
  }

  const visibleDrafts = drafts.map((draft) => draftEdits[draft.id] ?? draft)
  const readyCount = visibleDrafts.filter(isReady).length

  function updateDraft(draft: CardDraft) {
    setDraftEdits((current) => ({ ...current, [draft.id]: draft }))
  }

  async function approveAll() {
    const readyDrafts = visibleDrafts.filter(isReady).map((draft) => ({ ...draft, quality: 'ready' as const, updatedAt: new Date() }))
    if (!readyDrafts.length) return
    setWorking(true)
    try {
      await Promise.all(readyDrafts.map((draft) => repository.saveDraft(draft)))
      const approved = await repository.approveReadyDrafts()
      setDraftEdits({})
      setMessage(`已将 ${approved.length} 张草稿加入个人资料牌组`)
      refresh()
    } finally {
      setWorking(false)
    }
  }

  return (
    <div className="page import-page">
      <header className="page-header compact">
        <div><p className="eyebrow">MATERIAL / LOCAL AGENT</p><h1>资料拆卡</h1><p className="page-lead">把 Markdown 资料整理成可审核的知识卡片草稿。</p></div>
      </header>
      <section className="import-composer">
        <div className="section-heading"><div><span className="section-index">INPUT / 01</span><h2>导入资料</h2></div><FileText size={20} /></div>
        <label className="material-input-label" htmlFor="material-content">资料内容</label>
        <textarea id="material-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="粘贴 Markdown 或纯文本资料" />
        <div className="import-actions">
          <label className="text-button" htmlFor="material-file"><Upload size={17} />选择 Markdown</label>
          <input id="material-file" className="backup-file-input" type="file" accept=".md,text/markdown,text/plain" aria-label="选择 Markdown 文件" onChange={(event) => { void importFile(event.target.files?.[0]); event.target.value = '' }} />
          <span className="file-name">{fileName}</span>
          <button className="save-button" disabled={working || !content.trim()} onClick={() => void generate()}><Sparkles size={17} />{working ? '分析中' : '生成卡片草稿'}</button>
        </div>
        {message && <p className="backup-message success" role="status">{message}</p>}
      </section>
      <section className="draft-section">
        <div className="section-heading"><div><span className="section-index">REVIEW / 02</span><h2>待审核草稿</h2></div><span className="draft-count">{drafts.length} 张</span></div>
        {drafts.length ? <>
          <div className="draft-batch-bar"><span>{readyCount} 张字段完整</span><button className="save-button" disabled={working || readyCount === 0} onClick={() => void approveAll()}><CheckCheck size={17} />确认全部可用草稿</button></div>
          <div className="draft-list">{visibleDrafts.map((draft) => <DraftEditor key={draft.id} draft={draft} onChange={updateDraft} onRefresh={refresh} onMessage={setMessage} />)}</div>
        </> : <div className="empty-list"><Plus size={28} /><p>还没有草稿，从上方导入一段资料。</p></div>}
      </section>
    </div>
  )
}

function DraftEditor({ draft, onChange, onRefresh, onMessage }: { draft: CardDraft; onChange: (draft: CardDraft) => void; onRefresh: () => void; onMessage: (message: string) => void }) {
  const { repository } = useAppContext()
  const ready = isReady(draft)

  async function save() {
    const next = { ...draft, quality: ready ? 'ready' as const : 'needs-review' as const, updatedAt: new Date() }
    await repository.saveDraft(next)
    onChange(next)
    onRefresh()
    onMessage('草稿已保存')
  }

  async function approve() {
    if (!ready) return
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
    <article className="draft-card">
      <div className="draft-card-header"><div><span className="topic-label">{draft.topic}</span><h3>{draft.title}</h3></div><span className={`draft-quality ${ready ? 'ready' : ''}`}>{ready ? '可确认' : '待补充'}</span></div>
      <label>问题<input value={draft.question} onChange={(event) => onChange({ ...draft, question: event.target.value })} /></label>
      <label>核心回答<textarea value={draft.coreAnswer} onChange={(event) => onChange({ ...draft, coreAnswer: event.target.value })} /></label>
      <label>理解补充<textarea value={draft.explanation} onChange={(event) => onChange({ ...draft, explanation: event.target.value })} /></label>
      <label>回答要点<textarea value={draft.keyPoints.join('\n')} onChange={(event) => onChange({ ...draft, keyPoints: splitLines(event.target.value) })} /></label>
      <div className="draft-field-grid">
        <label>关键词<textarea value={draft.tags.join('\n')} onChange={(event) => onChange({ ...draft, tags: splitLines(event.target.value) })} /></label>
        <label>延伸追问<textarea value={draft.followUps.join('\n')} onChange={(event) => onChange({ ...draft, followUps: splitLines(event.target.value) })} /></label>
      </div>
      <div className="draft-meta"><span>来源：{draft.sourceRef}</span><span>本地规则拆卡</span></div>
      <div className="draft-actions"><button className="text-button" onClick={() => void remove()}><Trash2 size={16} />删除</button><button className="text-button" onClick={() => void save()}><Save size={16} />保存草稿</button><button className="save-button" disabled={!ready} onClick={() => void approve()}><Plus size={16} />加入个人牌组</button></div>
    </article>
  )
}

function splitLines(value: string): string[] {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function isReady(draft: CardDraft): boolean {
  return Boolean(draft.question.trim() && draft.coreAnswer.trim())
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('无法读取资料'))
    reader.readAsText(file)
  })
}
