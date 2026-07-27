import type { AppCard, ReviewLog, ReviewState } from './types'

export type WeakCardInsight = {
  card: AppCard
  lastRating: number
  lowRatingCount: number
  lastReviewedAt: Date
}

export type DueForecastBucket = {
  date: Date
  count: number
}

export function findWeakCards(cards: AppCard[], logs: ReviewLog[]): WeakCardInsight[] {
  const logsByCard = new Map<string, ReviewLog[]>()
  for (const log of logs) {
    const cardLogs = logsByCard.get(log.cardId) ?? []
    cardLogs.push(log)
    logsByCard.set(log.cardId, cardLogs)
  }

  return cards.flatMap((card) => {
    const recentLogs = (logsByCard.get(card.id) ?? [])
      .sort((first, second) => second.review.getTime() - first.review.getTime())
      .slice(0, 5)
    if (recentLogs.length === 0) return []
    const lowRatingCount = recentLogs.filter((log) => log.rating === 1 || log.rating === 2).length
    if (recentLogs[0].rating !== 1 && lowRatingCount < 2) return []
    return [{
      card,
      lastRating: recentLogs[0].rating,
      lowRatingCount,
      lastReviewedAt: recentLogs[0].review
    }]
  }).sort((first, second) => {
    if (first.lastRating === 1 && second.lastRating !== 1) return -1
    if (first.lastRating !== 1 && second.lastRating === 1) return 1
    return second.lowRatingCount - first.lowRatingCount || second.lastReviewedAt.getTime() - first.lastReviewedAt.getTime()
  })
}

export function buildSevenDayForecast(states: ReviewState[], now = new Date()): DueForecastBucket[] {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const counts = new Map<string, number>()
  for (const state of states) {
    if (state.reviewCount === 0) continue
    const key = toLocalDateKey(state.due)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return { date, count: counts.get(toLocalDateKey(date)) ?? 0 }
  })
}

function toLocalDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
