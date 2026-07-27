import { BookMarked, Check, Clock3, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useAppContext } from '../app/appContextValue'
import { useAsyncData } from '../app/useAsyncData'
import { ErrorState, LoadingState } from '../components/PageState'
import { CardPriorityBadge } from '../components/CardPriorityBadge'
import type { CardImportance } from '../domain/types'

type ImportanceFilter = 'all' | CardImportance

export function DeckPage() {
  const { database, revision } = useAppContext()
  const [query, setQuery] = useState('')
  const [importance, setImportance] = useState<ImportanceFilter>('all')
  const { data, loading, error } = useAsyncData(async () => {
    const [deck, cards, states] = await Promise.all([
      database.decks.toCollection().first(),
      database.cards.orderBy('order').toArray(),
      database.reviewStates.toArray()
    ])
    return { deck, cards, states }
  }, revision)

  const filteredCards = useMemo(() => data?.cards.filter((card) => {
    const haystack = `${card.question} ${card.topic} ${card.tags.join(' ')}`.toLowerCase()
    return (importance === 'all' || card.importance === importance) && haystack.includes(query.trim().toLowerCase())
  }) ?? [], [data, importance, query])

  if (loading) return <LoadingState />
  if (error || !data?.deck) return <ErrorState message={error ?? '找不到牌组'} />
  const learnedIds = new Set(data.states.filter((state) => state.reviewCount > 0).map((state) => state.cardId))

  return (
    <div className="page">
      <header className="page-header compact">
        <div><p className="eyebrow">DECK / JAVA</p><h1>{data.deck.name}</h1><p className="page-lead">{data.deck.description}</p></div>
        <div className="deck-count"><strong>{data.cards.length}</strong><span>张卡片</span></div>
      </header>
      <div className="deck-toolbar">
        <label className="search-field"><Search size={18} /><span className="sr-only">搜索卡片</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索问题、主题或标签" /></label>
        <div className="deck-toolbar-actions">
          <div className="importance-filter" aria-label="按重要度筛选">
            {([['all', '全部'], ['S', 'S 级'], ['A', 'A 级']] as const).map(([value, label]) => (
              <button key={value} className={importance === value ? 'active' : ''} aria-pressed={importance === value} aria-label={value === 'all' ? '查看全部等级' : `仅看 ${label}`} onClick={() => setImportance(value)}>{label}</button>
            ))}
          </div>
          <span className="version-label">CONTENT VERSION {data.deck.version}</span>
        </div>
      </div>
      <div className="card-list">
        {filteredCards.map((card, cardIndex) => {
          const learned = learnedIds.has(card.id)
          return (
            <article className="card-list-item" key={card.id}>
              <span className="card-number">{String(cardIndex + 1).padStart(2, '0')}</span>
              <div><div className="card-list-meta"><span className="topic-label">{card.topic}</span><CardPriorityBadge importance={card.importance} score={card.score} /></div><h2>{card.question}</h2><div className="tag-row">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <span className={learned ? 'learn-state learned' : 'learn-state'}>{learned ? <Check size={16} /> : <Clock3 size={16} />}{learned ? '已学习' : '未学习'}</span>
            </article>
          )
        })}
        {filteredCards.length === 0 && <div className="empty-list"><BookMarked size={28} /><p>没有匹配的卡片</p></div>}
      </div>
    </div>
  )
}
