import type { ReviewLog, ReviewState } from './types'
import { buildSevenDayForecast, findWeakCards } from './insights'
import { javaCards } from '../data/javaCards'
import { createEmptyReviewState } from './study'

describe('learning insights', () => {
  it('marks cards weak from the latest failure or repeated low ratings', () => {
    const cards = javaCards.slice(0, 4)
    const logs = [
      reviewLog(cards[0].id, 3, new Date('2026-07-21T08:00:00.000Z')),
      reviewLog(cards[1].id, 4, new Date('2026-07-20T08:00:00.000Z')),
      reviewLog(cards[1].id, 1, new Date('2026-07-21T08:00:00.000Z')),
      reviewLog(cards[2].id, 2, new Date('2026-07-17T08:00:00.000Z')),
      reviewLog(cards[2].id, 3, new Date('2026-07-18T08:00:00.000Z')),
      reviewLog(cards[2].id, 4, new Date('2026-07-19T08:00:00.000Z')),
      reviewLog(cards[2].id, 2, new Date('2026-07-20T08:00:00.000Z')),
      reviewLog(cards[2].id, 3, new Date('2026-07-21T08:00:00.000Z')),
      reviewLog(cards[3].id, 2, new Date('2026-07-21T08:00:00.000Z'))
    ]

    const weakCards = findWeakCards(cards, logs)

    expect(weakCards.map((item) => item.card.id)).toEqual([cards[1].id, cards[2].id])
    expect(weakCards[0]).toMatchObject({ lastRating: 1, lowRatingCount: 1 })
    expect(weakCards[1]).toMatchObject({ lastRating: 3, lowRatingCount: 2 })
  })

  it('builds seven local-date due buckets for learned cards only', () => {
    const now = new Date(2026, 6, 21, 10, 0, 0)
    const states = [
      reviewState('learned-today', 1, new Date(2026, 6, 21, 23, 0, 0)),
      reviewState('learned-day-three', 2, new Date(2026, 6, 23, 8, 0, 0)),
      reviewState('unseen', 0, new Date(2026, 6, 22, 8, 0, 0)),
      reviewState('outside-range', 1, new Date(2026, 6, 28, 8, 0, 0))
    ]

    const forecast = buildSevenDayForecast(states, now)

    expect(forecast).toHaveLength(7)
    expect(forecast.map((bucket) => bucket.count)).toEqual([1, 0, 1, 0, 0, 0, 0])
    expect(forecast[0].date).toEqual(new Date(2026, 6, 21))
    expect(forecast[6].date).toEqual(new Date(2026, 6, 27))
  })
})

function reviewLog(cardId: string, rating: 1 | 2 | 3 | 4, review: Date): ReviewLog {
  return {
    cardId,
    rating,
    state: 0,
    due: review,
    stability: 0,
    difficulty: 0,
    elapsed_days: 0,
    last_elapsed_days: 0,
    scheduled_days: 0,
    learning_steps: 0,
    review
  }
}

function reviewState(cardId: string, reviewCount: number, due: Date): ReviewState {
  const state = createEmptyReviewState(cardId, due)
  return { ...state, reviewCount, due, fsrsCard: { ...state.fsrsCard, due } }
}
