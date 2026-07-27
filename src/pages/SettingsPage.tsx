import { Database, Download, RotateCcw, Save, ShieldCheck, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'

export function SettingsPage() {
  const { repository, refresh, revision } = useAppContext()
  const { data, loading, error } = useAsyncData(() => repository.getSettings(), revision)
  const [newLimit, setNewLimit] = useState(5)
  const [reviewLimit, setReviewLimit] = useState(20)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [backupMessage, setBackupMessage] = useState<{ kind: 'success' | 'error'; text: string }>()

  useEffect(() => {
    if (data) {
      setNewLimit(data.dailyNewLimit)
      setReviewLimit(data.dailyReviewLimit)
    }
  }, [data])

  if (loading && !data) return <LoadingState />
  if (error) return <ErrorState message={error} />

  async function save() {
    await repository.saveSettings({ dailyNewLimit: newLimit, dailyReviewLimit: reviewLimit })
    setSaved(true)
    refresh()
    window.setTimeout(() => setSaved(false), 1800)
  }

  async function reset() {
    await repository.resetProgress()
    setConfirmReset(false)
    refresh()
  }

  async function exportBackup() {
    const backup = await repository.exportBackup()
    const url = URL.createObjectURL(new Blob([backup], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `recall-stack-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function importBackup(file?: File) {
    if (!file) return
    try {
      await repository.importBackup(await readFileAsText(file))
      setBackupMessage({ kind: 'success', text: '备份已恢复' })
      refresh()
    } catch {
      setBackupMessage({ kind: 'error', text: '备份无效，请选择 RecallStack 导出的 JSON 文件' })
    }
  }

  return (
    <div className="page settings-page">
      <header className="page-header compact"><div><p className="eyebrow">PREFERENCES / LOCAL</p><h1>学习设置</h1><p className="page-lead">控制每天的负荷，不追求一次学完。</p></div></header>
      <section className="settings-section">
        <div className="settings-section-title"><Database size={20} /><div><h2>每日任务</h2><p>修改后会在下一次生成任务时生效。</p></div></div>
        <div className="setting-row"><label htmlFor="new-limit"><strong>每日新卡</strong><span>首次进入学习的卡片数量</span></label><div className="number-control"><input id="new-limit" type="number" min="1" max="20" value={newLimit} onChange={(event) => setNewLimit(Number(event.target.value))} /><span>张</span></div></div>
        <div className="setting-row"><label htmlFor="review-limit"><strong>复习上限</strong><span>单日最多处理的到期卡片</span></label><div className="number-control"><input id="review-limit" type="number" min="5" max="200" value={reviewLimit} onChange={(event) => setReviewLimit(Number(event.target.value))} /><span>张</span></div></div>
        <button className="save-button" onClick={save}><Save size={18} />{saved ? '已保存' : '保存设置'}</button>
      </section>
      <section className="settings-section danger-zone">
        <div className="settings-section-title"><ShieldCheck size={20} /><div><h2>本地数据</h2><p>牌组内容不会被删除，只有复习记录会被清空。</p></div></div>
        <div className="backup-actions">
          <button className="text-button" onClick={exportBackup}><Download size={17} />导出备份</button>
          <label className="text-button backup-import" htmlFor="backup-file"><Upload size={17} />导入备份</label>
          <input id="backup-file" className="backup-file-input" type="file" accept="application/json,.json" aria-label="导入备份" onChange={(event) => {
            void importBackup(event.target.files?.[0])
            event.target.value = ''
          }} />
        </div>
        {backupMessage && <p className={`backup-message ${backupMessage.kind}`} role="status">{backupMessage.text}</p>}
        {!confirmReset ? <button className="text-button danger" onClick={() => setConfirmReset(true)}><RotateCcw size={17} />重置学习进度</button> : <div className="confirm-row"><p>确定清空全部学习记录？</p><button onClick={() => setConfirmReset(false)}>取消</button><button className="danger-confirm" onClick={reset}>确认重置</button></div>}
      </section>
    </div>
  )
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('无法读取备份文件'))
    reader.readAsText(file)
  })
}
