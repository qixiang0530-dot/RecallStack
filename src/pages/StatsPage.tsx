import { Activity, BarChart3, Brain, CalendarDays, RotateCcw, TriangleAlert } from 'lucide-react'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'
import { buildSevenDayForecast, findWeakCards } from '../domain/insights'

export function StatsPage() {
  const { database, repository, revision } = useAppContext()
  const { data, loading, error } = useAsyncData(async () => {
    const [cards, states, logs, dashboard] = await Promise.all([
      database.cards.toArray(), database.reviewStates.toArray(), database.reviewLogs.toArray(), repository.getDashboard()
    ])
    const weakCards = findWeakCards(cards, logs)
    const weakCountByTopic = new Map<string, number>()
    weakCards.forEach(({ card }) => weakCountByTopic.set(card.topic, (weakCountByTopic.get(card.topic) ?? 0) + 1))
    const topics = [...new Set(cards.map((card) => card.topic))].map((topic) => {
      const topicCards = cards.filter((card) => card.topic === topic)
      const learned = topicCards.filter((card) => states.some((state) => state.cardId === card.id && state.reviewCount > 0)).length
      return { topic, learned, total: topicCards.length, percentage: Math.round(learned / topicCards.length * 100), weak: weakCountByTopic.get(topic) ?? 0 }
    }).sort((a, b) => b.percentage - a.percentage)
    const averageRating = logs.length ? logs.reduce((sum, log) => sum + log.rating, 0) / logs.length : 0
    return { logs, dashboard, topics, averageRating, weakCards, forecast: buildSevenDayForecast(states) }
  }, revision)

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? '无法统计学习数据'} />

  return (
    <div className="page">
      <header className="page-header compact"><div><p className="eyebrow">PROGRESS / MEMORY</p><h1>学习统计</h1><p className="page-lead">先建立稳定的复习习惯，再关注数字增长。</p></div></header>
      <div className="stats-strip">
        <div><RotateCcw size={20} /><span>累计复习</span><strong>{data.logs.length}</strong></div>
        <div><Brain size={20} /><span>已学习卡片</span><strong>{data.dashboard.learnedCount}</strong></div>
        <div><Activity size={20} /><span>平均评分</span><strong>{data.averageRating ? data.averageRating.toFixed(1) : '—'}</strong></div>
      </div>
      <section className="forecast-section">
        <div className="section-heading"><div><span className="section-index">FORECAST / 01</span><h2>未来 7 天复习</h2></div><CalendarDays size={20} /></div>
        <div className="forecast-bars">
          {data.forecast.map((bucket) => {
            const maxCount = Math.max(1, ...data.forecast.map((item) => item.count))
            return (
              <div className="forecast-day" key={bucket.date.toISOString()}>
                <strong>{bucket.count}</strong>
                <div className="forecast-track"><span style={{ height: `${bucket.count / maxCount * 100}%` }} /></div>
                <span>{formatForecastDate(bucket.date)}</span>
              </div>
            )
          })}
        </div>
      </section>
      <section className="topic-progress-section">
        <div className="section-heading"><div><span className="section-index">TOPICS / 02</span><h2>主题掌握进度</h2></div><BarChart3 size={20} /></div>
        <div className="topic-bars">
          {data.topics.map((topic) => (
            <div className="topic-row" key={topic.topic}>
              <div><strong>{topic.topic}</strong><span>{topic.weak ? `${topic.topic} · ${topic.weak} 张薄弱` : `${topic.learned} / ${topic.total}`}</span></div>
              <div className="topic-track"><span style={{ width: `${topic.percentage}%` }} /></div>
              <b>{topic.percentage}%</b>
            </div>
          ))}
        </div>
      </section>
      <section className="weak-cards-section">
        <div className="section-heading"><div><span className="section-index">WEAK / 03</span><h2>薄弱卡片</h2></div><TriangleAlert size={20} /></div>
        {data.weakCards.length > 0 ? (
          <div className="weak-card-list">
            {data.weakCards.slice(0, 8).map((item) => (
              <div className="weak-card-row" key={item.card.id}>
                <span>{item.card.topic}</span>
                <strong>{item.card.question}</strong>
                <b>近 5 次低分 {item.lowRatingCount}</b>
              </div>
            ))}
          </div>
        ) : <p className="stats-note">目前没有识别到薄弱卡片。</p>}
      </section>
      {data.logs.length === 0 && <p className="stats-note">完成第一次学习后，这里会开始记录你的真实复习数据。</p>}
    </div>
  )
}

function formatForecastDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`
}
