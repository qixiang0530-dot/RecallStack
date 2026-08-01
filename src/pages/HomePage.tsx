import { ArrowRight, BookOpenCheck, Flame, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'

export function HomePage() {
  const { repository, refresh, revision } = useAppContext()
  const navigate = useNavigate()
  const { data, loading, error } = useAsyncData(async () => ({
    dashboard: await repository.getDashboard(),
    settings: await repository.getSettings()
  }), revision)

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? '无法读取学习数据'} />

  const totalToday = data.dashboard.newCount + data.dashboard.reviewCount
  const progress = totalToday === 0 ? 100 : Math.min(100, Math.round(data.dashboard.completedToday / (data.dashboard.completedToday + totalToday) * 100))

  return (
    <div className="page home-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date())}</p>
          <h1>今天，先记住一点</h1>
          <p className="page-lead">把零散的 Java 知识，变成能随时说出口的答案。</p>
        </div>
        <div className="streak-block" aria-label={`连续学习 ${data.dashboard.streak} 天`}>
          <Flame size={22} />
          <strong>{data.dashboard.streak}</strong>
          <span>连续天数</span>
        </div>
      </header>

      <section className="today-band" aria-labelledby="today-title">
        <div className="today-copy">
          <span className="section-index">TODAY / 01</span>
          <h2 id="today-title">今日学习</h2>
          <div className="task-chips">
            <span><Sparkles size={16} />{data.dashboard.newCount} 张新卡</span>
            <span><RotateCcw size={16} />{data.dashboard.reviewCount} 张复习</span>
          </div>
          {totalToday > 0 ? (
            <Link className="primary-command" to="/study">
              开始今日学习 <ArrowRight size={18} />
            </Link>
          ) : (
            <p className="done-message"><BookOpenCheck size={19} /> 今天的任务已经完成</p>
          )}
        </div>
        <div className="progress-dial" style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}>
          <div><strong>{progress}%</strong><span>今日进度</span></div>
        </div>
      </section>

      <section className="overview-section" aria-labelledby="overview-title">
        <div className="section-heading">
          <div><span className="section-index">LIBRARY / 02</span><h2 id="overview-title">Java 后端面试重点牌组</h2></div>
          <Link to="/deck">查看牌组 <ArrowRight size={16} /></Link>
        </div>
        <div className="metric-grid">
          <div className="metric"><span>已学习</span><strong>{data.dashboard.learnedCount}</strong><small>/ {data.dashboard.totalCards} 张</small></div>
          <div className="metric"><span>今日完成</span><strong>{data.dashboard.completedToday}</strong><small>次回忆</small></div>
          <div className="metric accent"><span>当前范围</span><strong>S / A 重点</strong><small>11 个专题</small></div>
        </div>
      </section>
      {!data.settings.onboardingCompleted && <OnboardingDialog onComplete={async () => { await repository.completeOnboarding(); refresh(); navigate('/study') }} />}
    </div>
  )
}

function OnboardingDialog({ onComplete }: { onComplete: () => Promise<void> }) {
  const [step, setStep] = useState(0)
  const steps = [
    { title: '先主动回忆，再查看答案', text: '先尝试用自己的话回答问题，再展开答案内容。' },
    { title: '用四档评分安排复习', text: '根据真实掌握程度评分，FSRS 会安排下一次复习。' },
    { title: '记录只保存在当前浏览器', text: '学习数据不会上传服务器，请定期在设置页导出备份。' }
  ]
  const current = steps[step]
  return (
    <div className="onboarding-backdrop">
      <section className="onboarding-dialog" role="dialog" aria-modal="true" aria-label="首次使用引导">
        <span className="eyebrow">WELCOME / 0{step + 1}</span>
        <h2>{current.title}</h2>
        <p>{current.text}</p>
        <div className="onboarding-dots">{steps.map((item, index) => <span key={item.title} className={index === step ? 'active' : ''} />)}</div>
        <div className="onboarding-actions">
          {step < steps.length - 1 && <button className="text-button" onClick={() => void onComplete()}>直接体验 Java Demo</button>}
          {step < steps.length - 1 ? <button className="save-button" onClick={() => setStep(step + 1)}>下一步</button> : <button className="save-button" onClick={() => void onComplete()}>开始体验</button>}
        </div>
      </section>
    </div>
  )
}
