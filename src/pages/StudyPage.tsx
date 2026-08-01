import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Eye, Lightbulb, ListChecks } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'
import { CardPriorityBadge } from '../components/CardPriorityBadge'
import { getIntervalLabel, scheduleReview } from '../domain/study'
import type { RecallRating } from '../domain/types'

const ratingOptions: { rating: RecallRating; label: string; className: string }[] = [
  { rating: 1, label: '忘记', className: 'again' },
  { rating: 2, label: '吃力', className: 'hard' },
  { rating: 3, label: '记得', className: 'good' },
  { rating: 4, label: '轻松', className: 'easy' }
]

export function StudyPage() {
  const { repository, refresh, revision } = useAppContext()
  const { data: session, loading, error } = useAsyncData(() => repository.getDailyStudySession(), revision)
  const [revealed, setRevealed] = useState(false)
  const [viewingPrevious, setViewingPrevious] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reviewTime, setReviewTime] = useState(() => new Date())
  const currentItem = session?.items[session.position]
  const previousReview = session?.previousReview
  const item = viewingPrevious ? previousReview?.item : currentItem

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowLeft' && previousReview) {
        event.preventDefault()
        setViewingPrevious(true)
        return
      }
      if (event.key === ' ' && item && !viewingPrevious && !revealed) {
        event.preventDefault()
        setRevealed(true)
        return
      }
      const rating = Number(event.key)
      if (item && (viewingPrevious || revealed) && rating >= 1 && rating <= 4 && !submitting) {
        event.preventDefault()
        void rate(rating as RecallRating)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (loading && !session) return <LoadingState />
  if (error || !session) return <ErrorState message={error ?? '无法生成学习任务'} />

  if (!item) {
    return <StudyComplete sessionId={session.id} onPrevious={previousReview ? () => setViewingPrevious(true) : undefined} />
  }
  const sessionId = session.id
  const itemCardId = item.card.id

  async function rate(rating: RecallRating) {
    if (!session || !item) return
    setSubmitting(true)
    try {
      if (viewingPrevious) {
        await repository.rerateLastSessionCard(sessionId, rating)
      } else {
        await repository.reviewDailySessionCard(sessionId, itemCardId, rating)
        setRevealed(false)
      }
      setReviewTime(new Date())
      refresh()
    } finally {
      setSubmitting(false)
    }
  }

  const answerVisible = viewingPrevious || revealed
  const previewState = viewingPrevious && previousReview ? previousReview.previousState : item.state
  const previewTime = viewingPrevious && previousReview ? previousReview.reviewedAt : reviewTime
  const progressNumber = viewingPrevious ? session.position : session.position + 1

  return (
    <div className="study-page">
      <header className="study-header">
        <Link className="icon-link" to="/" aria-label="返回首页"><ArrowLeft size={20} /></Link>
        <div className="study-progress-copy"><span>{progressNumber} / {session.items.length}</span><strong>{item.card.topic}</strong></div>
        <span className={viewingPrevious ? 'status-label previous' : item.isNew ? 'status-label new' : 'status-label review'}>{viewingPrevious ? '上一题' : item.isNew ? '新卡' : '复习'}</span>
      </header>
      <div className="linear-progress"><span style={{ width: `${(session.position / session.items.length) * 100}%` }} /></div>

      {previousReview && (
        <div className="study-history-navigation">
          {!viewingPrevious ? (
            <button className="history-command" onClick={() => setViewingPrevious(true)}><ChevronLeft size={17} />查看上一题</button>
          ) : (
            <button className="history-command" onClick={() => setViewingPrevious(false)}>回到当前题<ChevronRight size={17} /></button>
          )}
        </div>
      )}

      <article className="study-card">
        <div className="question-block">
          <div className="question-meta"><p className="eyebrow">RECALL PROMPT</p><CardPriorityBadge importance={item.card.importance} score={item.card.score} /></div>
          <h1>{item.card.question}</h1>
          {!answerVisible && <p className="recall-hint">先在心里组织答案，再检查表达是否完整。</p>}
        </div>

        {!answerVisible ? (
          <button className="reveal-button" onClick={() => setRevealed(true)}><Eye size={19} />查看答案</button>
        ) : (
          <div className="answer-sheet">
            <section className="core-answer"><span>30 秒回答</span><p>{item.card.coreAnswer}</p></section>
            <section><h2><ListChecks size={18} />回答要点</h2><ul>{item.card.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul></section>
            <section><h2><Lightbulb size={18} />理解补充</h2><p>{item.card.explanation}</p></section>
            <section className="follow-up"><span>面试官可能继续问</span>{item.card.followUps.map((question) => <p key={question}>{question}</p>)}</section>
            <section className="source-reference"><span>内容来源</span><p>{item.card.sourceRef}</p></section>
          </div>
        )}
      </article>

      {answerVisible && (
        <div className="rating-panel">
          <p>{viewingPrevious ? '修改上一题评分' : '这次回忆得怎么样？'}</p>
          <div className="rating-grid">
            {ratingOptions.map((option) => {
              const preview = scheduleReview(previewState, option.rating, previewTime)
              const selected = viewingPrevious && previousReview?.rating === option.rating
              return (
                <button key={option.rating} className={`rating-button ${option.className}${selected ? ' selected' : ''}`} aria-pressed={selected} disabled={submitting} onClick={() => rate(option.rating)}>
                  <strong>{option.label}</strong><span>{getIntervalLabel(preview.fsrsCard, previewTime)}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function StudyComplete({ sessionId, onPrevious }: { sessionId: string; onPrevious?: () => void }) {
  const { repository, revision } = useAppContext()
  const { data, loading, error } = useAsyncData(() => repository.getStudyCompletion(sessionId), revision)
  if (loading && !data) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? '无法生成学习总结'} />
  const nextDue = data.nextDue ? new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(data.nextDue) : '等待安排'
  return (
    <div className="study-complete page">
      <CheckCircle2 size={42} />
      <p className="eyebrow">SESSION COMPLETE</p>
      <h1>今天到这里</h1>
      <p>完成 {data.completed} / {data.total} 张卡片，下一次复习预计在 {nextDue}。</p>
      <div className="completion-grid">
        <div><span>新卡</span><strong>{data.newCards}</strong></div>
        <div><span>复习</span><strong>{data.reviewCards}</strong></div>
        <div><span>忘记 / 吃力</span><strong>{data.ratings.again + data.ratings.hard}</strong></div>
        <div><span>记得 / 轻松</span><strong>{data.ratings.good + data.ratings.easy}</strong></div>
      </div>
      {onPrevious && <button className="history-command" onClick={onPrevious}><ChevronLeft size={17} />查看上一题</button>}
      <div className="completion-actions"><Link className="text-button" to="/stats">查看统计</Link><Link className="primary-command" to="/">返回首页 <ChevronRight size={18} /></Link></div>
    </div>
  )
}
