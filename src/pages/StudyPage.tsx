import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Eye, Lightbulb, ListChecks } from 'lucide-react'
import { useState } from 'react'
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

  if (loading && !session) return <LoadingState />
  if (error || !session) return <ErrorState message={error ?? '无法生成学习任务'} />
  const currentItem = session.items[session.position]
  const previousReview = session.previousReview
  const item = viewingPrevious ? previousReview?.item : currentItem

  if (!item) {
    return (
      <div className="study-complete page">
        <CheckCircle2 size={42} />
        <p className="eyebrow">SESSION COMPLETE</p>
        <h1>今天到这里</h1>
        <p>完成了 {session.items.length} 张卡片。下一次到期时再见。</p>
        {previousReview && <button className="history-command" onClick={() => setViewingPrevious(true)}><ChevronLeft size={17} />查看上一题</button>}
        <Link className="primary-command" to="/">返回首页 <ChevronRight size={18} /></Link>
      </div>
    )
  }
  const sessionId = session.id
  const itemCardId = item.card.id

  async function rate(rating: RecallRating) {
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
