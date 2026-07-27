import { createEmptyCard, fsrs, type Card as FsrsCard, type Grade } from 'ts-fsrs'
import type { QueueCandidate, RecallRating, ReviewLog, ReviewState } from './types'

const scheduler = fsrs({ enable_fuzz: false })

export function createEmptyReviewState(cardId: string, now: Date): ReviewState {
  return { cardId, fsrsCard: createEmptyCard(now), due: now, reviewCount: 0 }
}

export function createStudyQueue({
  cards,
  dailyNewLimit,
  reviewLimit,
  now
}: {
  cards: QueueCandidate[]
  dailyNewLimit: number
  reviewLimit: number
  now: Date
}): QueueCandidate[] {
  const dueReviews = cards
    .filter((card) => !card.isNew && card.due !== undefined && card.due <= now)
    .sort((a, b) => (a.due?.getTime() ?? 0) - (b.due?.getTime() ?? 0))
    .slice(0, reviewLimit)
  const newCards = cards.filter((card) => card.isNew).slice(0, dailyNewLimit)
  return [...dueReviews, ...newCards]
}

function toFsrsRating(rating: RecallRating): Grade {
  return rating as Grade
}

export function scheduleReview(
  state: ReviewState,
  rating: RecallRating,
  now: Date
): ReviewState {
  return scheduleReviewWithLog(state, rating, now).state
}

export function scheduleReviewWithLog(
  state: ReviewState,
  rating: RecallRating,
  now: Date
): { state: ReviewState; log: ReviewLog } {
  const result = scheduler.next(state.fsrsCard, now, toFsrsRating(rating))
  const nextState = {
    ...state,
    fsrsCard: result.card,
    due: result.card.due,
    reviewCount: state.reviewCount + 1,
    lastRating: rating,
    lastReviewedAt: now
  }
  return { state: nextState, log: { ...result.log, cardId: state.cardId } }
}

export function isNewReviewState(state: ReviewState): boolean {
  return state.reviewCount === 0
}

export function getIntervalLabel(current: FsrsCard, now: Date): string {
  const minutes = Math.max(0, Math.round((current.due.getTime() - now.getTime()) / 60000))
  if (minutes < 60) return `${minutes} 分钟后`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} 小时后`
  return `${Math.round(hours / 24)} 天后`
}
