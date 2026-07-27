import type { CardImportance } from '../domain/types'

export function CardPriorityBadge({ importance, score }: { importance: CardImportance; score: number }) {
  return <span className={`importance-badge importance-${importance.toLowerCase()}`}>{importance} 级 · {score} 分</span>
}
