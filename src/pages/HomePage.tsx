import { ArrowRight, BookOpenCheck, Flame, RotateCcw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'

export function HomePage() {
  const { repository, revision } = useAppContext()
  const { data, loading, error } = useAsyncData(() => repository.getDashboard(), revision)

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? '无法读取学习数据'} />

  const totalToday = data.newCount + data.reviewCount
  const progress = totalToday === 0 ? 100 : Math.min(100, Math.round(data.completedToday / (data.completedToday + totalToday) * 100))

  return (
    <div className="page home-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date())}</p>
          <h1>今天，先记住一点</h1>
          <p className="page-lead">把零散的 Java 知识，变成能随时说出口的答案。</p>
        </div>
        <div className="streak-block" aria-label={`连续学习 ${data.streak} 天`}>
          <Flame size={22} />
          <strong>{data.streak}</strong>
          <span>连续天数</span>
        </div>
      </header>

      <section className="today-band" aria-labelledby="today-title">
        <div className="today-copy">
          <span className="section-index">TODAY / 01</span>
          <h2 id="today-title">今日学习</h2>
          <div className="task-chips">
            <span><Sparkles size={16} />{data.newCount} 张新卡</span>
            <span><RotateCcw size={16} />{data.reviewCount} 张复习</span>
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
          <div className="metric"><span>已学习</span><strong>{data.learnedCount}</strong><small>/ {data.totalCards} 张</small></div>
          <div className="metric"><span>今日完成</span><strong>{data.completedToday}</strong><small>次回忆</small></div>
          <div className="metric accent"><span>当前范围</span><strong>S / A 重点</strong><small>11 个专题</small></div>
        </div>
      </section>
    </div>
  )
}
