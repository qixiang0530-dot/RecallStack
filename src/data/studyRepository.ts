import type { AppCard, RecallRating, ReviewState } from '../domain/types'
import { createEmptyReviewState, createStudyQueue, scheduleReviewWithLog } from '../domain/study'
import { backupSchema, settingsInputSchema } from '../domain/schemas'
import type { RecallStackDatabase, SettingsRecord, StudySessionRecord } from './database'

export type StudyItem = {
  card: AppCard
  state: ReviewState
  isNew: boolean
}

export type DashboardSnapshot = {
  newCount: number
  reviewCount: number
  completedToday: number
  streak: number
  learnedCount: number
  totalCards: number
}

export type DailyStudySession = {
  id: string
  items: StudyItem[]
  position: number
  previousReview?: {
    item: StudyItem
    rating: RecallRating
    previousState: ReviewState
    reviewedAt: Date
  }
}

export class StudyRepository {
  constructor(private readonly database: RecallStackDatabase) {}

  async getSettings(): Promise<SettingsRecord> {
    return (await this.database.settings.get('default')) ?? {
      id: 'default',
      dailyNewLimit: 5,
      dailyReviewLimit: 20
    }
  }

  async saveSettings(settings: Omit<SettingsRecord, 'id'>): Promise<void> {
    const validated = settingsInputSchema.parse(settings)
    await this.database.settings.put({ id: 'default', ...validated })
  }

  async getStudyQueue(now = new Date()): Promise<StudyItem[]> {
    const [cards, states, settings] = await Promise.all([
      this.database.cards.toArray(),
      this.database.reviewStates.toArray(),
      this.getSettings()
    ])
    cards.sort((first, second) => first.order - second.order)
    const stateByCardId = new Map(states.map((state) => [state.cardId, state]))
    const candidates = cards.map((card) => {
      const state = stateByCardId.get(card.id) ?? createEmptyReviewState(card.id, now)
      return { id: card.id, isNew: state.reviewCount === 0, due: state.due }
    })
    const queue = createStudyQueue({
      cards: candidates,
      dailyNewLimit: settings.dailyNewLimit,
      reviewLimit: settings.dailyReviewLimit,
      now
    })
    const cardById = new Map(cards.map((card) => [card.id, card]))
    return queue.flatMap((candidate) => {
      const card = cardById.get(candidate.id)
      const state = stateByCardId.get(candidate.id)
      return card && state ? [{ card, state, isNew: candidate.isNew }] : []
    })
  }

  async getDailyStudySession(now = new Date()): Promise<DailyStudySession> {
    const id = `study-${toDateKey(now)}`
    let session = await this.database.studySessions.get(id)
    if (!session) {
      const queue = await this.getStudyQueue(now)
      session = {
        id,
        items: queue.map((item) => ({ cardId: item.card.id, isNew: item.isNew })),
        position: 0,
        createdAt: now,
        updatedAt: now
      }
      await this.database.studySessions.put(session)
    }
    return this.hydrateStudySession(session, now)
  }

  async getDashboard(now = new Date()): Promise<DashboardSnapshot> {
    const [session, states, logs, totalCards] = await Promise.all([
      this.getDailyStudySession(now),
      this.database.reviewStates.toArray(),
      this.database.reviewLogs.toArray(),
      this.database.cards.count()
    ])
    const today = toDateKey(now)
    const remainingItems = session.items.slice(session.position)
    const completedToday = logs.filter((log) => toDateKey(log.review) === today).length
    const reviewDays = new Set(logs.map((log) => toDateKey(log.review)))
    return {
      newCount: remainingItems.filter((item) => item.isNew).length,
      reviewCount: remainingItems.filter((item) => !item.isNew).length,
      completedToday,
      streak: calculateStreak(reviewDays, now),
      learnedCount: states.filter((state) => state.reviewCount > 0).length,
      totalCards
    }
  }

  async reviewCard(cardId: string, rating: RecallRating, now = new Date()): Promise<ReviewState> {
    const current = await this.database.reviewStates.get(cardId)
    if (!current) throw new Error(`Review state not found for card: ${cardId}`)
    const { state, log } = scheduleReviewWithLog(current, rating, now)
    await this.database.transaction('rw', [this.database.reviewStates, this.database.reviewLogs], async () => {
      await this.database.reviewStates.put(state)
      await this.database.reviewLogs.add(log)
    })
    return state
  }

  async reviewDailySessionCard(
    sessionId: string,
    cardId: string,
    rating: RecallRating,
    now = new Date()
  ): Promise<ReviewState> {
    let nextState: ReviewState | undefined
    await this.database.transaction('rw', [this.database.reviewStates, this.database.reviewLogs, this.database.studySessions], async () => {
      const session = await this.database.studySessions.get(sessionId)
      if (!session) throw new Error(`Study session not found: ${sessionId}`)
      const queueItem = session.items[session.position]
      if (queueItem?.cardId !== cardId) throw new Error(`Card is not current in session: ${cardId}`)
      const current = await this.database.reviewStates.get(cardId)
      if (!current) throw new Error(`Review state not found for card: ${cardId}`)
      const scheduled = scheduleReviewWithLog(current, rating, now)
      const logId = await this.database.reviewLogs.add(scheduled.log)
      nextState = scheduled.state
      await this.database.reviewStates.put(scheduled.state)
      await this.database.studySessions.put({
        ...session,
        position: session.position + 1,
        lastReview: {
          cardId,
          queueIndex: session.position,
          previousState: current,
          logId,
          rating,
          reviewedAt: now
        },
        updatedAt: now
      })
    })
    if (!nextState) throw new Error(`Unable to review card: ${cardId}`)
    return nextState
  }

  async rerateLastSessionCard(sessionId: string, rating: RecallRating): Promise<ReviewState> {
    let nextState: ReviewState | undefined
    await this.database.transaction('rw', [this.database.reviewStates, this.database.reviewLogs, this.database.studySessions], async () => {
      const session = await this.database.studySessions.get(sessionId)
      const previous = session?.lastReview
      if (!session || !previous) throw new Error(`Previous review not found for session: ${sessionId}`)
      const scheduled = scheduleReviewWithLog(previous.previousState, rating, previous.reviewedAt)
      nextState = scheduled.state
      await this.database.reviewStates.put(scheduled.state)
      await this.database.reviewLogs.put({ ...scheduled.log, id: previous.logId })
      await this.database.studySessions.put({
        ...session,
        lastReview: { ...previous, rating },
        updatedAt: new Date()
      })
    })
    if (!nextState) throw new Error(`Unable to rerate previous card for session: ${sessionId}`)
    return nextState
  }

  async resetProgress(now = new Date()): Promise<void> {
    const cardIds = await this.database.cards.toCollection().primaryKeys()
    await this.database.transaction('rw', [this.database.reviewStates, this.database.reviewLogs, this.database.studySessions], async () => {
      await this.database.reviewLogs.clear()
      await this.database.studySessions.clear()
      await this.database.reviewStates.bulkPut(cardIds.map((cardId) => createEmptyReviewState(String(cardId), now)))
    })
  }

  async exportBackup(): Promise<string> {
    const [settings, reviewStates, reviewLogs, studySessions] = await Promise.all([
      this.getSettings(),
      this.database.reviewStates.toArray(),
      this.database.reviewLogs.toArray(),
      this.database.studySessions.toArray()
    ])
    return JSON.stringify({
      version: 1,
      exportedAt: new Date(),
      settings,
      reviewStates,
      reviewLogs,
      studySessions
    }, null, 2)
  }

  async importBackup(json: string): Promise<void> {
    const backup = backupSchema.parse(JSON.parse(json))
    await this.database.transaction(
      'rw',
      [this.database.settings, this.database.reviewStates, this.database.reviewLogs, this.database.studySessions],
      async () => {
        await Promise.all([
          this.database.settings.clear(),
          this.database.reviewStates.clear(),
          this.database.reviewLogs.clear(),
          this.database.studySessions.clear()
        ])
        await this.database.settings.put(backup.settings)
        await this.database.reviewStates.bulkPut(backup.reviewStates)
        await this.database.reviewLogs.bulkPut(backup.reviewLogs)
        await this.database.studySessions.bulkPut(backup.studySessions)
      }
    )
  }

  private async hydrateStudySession(session: StudySessionRecord, now: Date): Promise<DailyStudySession> {
    const [cards, states] = await Promise.all([
      this.database.cards.bulkGet(session.items.map((item) => item.cardId)),
      this.database.reviewStates.bulkGet(session.items.map((item) => item.cardId))
    ])
    const items = session.items.flatMap((queueItem, index) => {
      const card = cards[index]
      if (!card) return []
      const state = states[index] ?? createEmptyReviewState(card.id, now)
      return [{ card, state, isNew: queueItem.isNew }]
    })
    const previousItem = session.lastReview ? items[session.lastReview.queueIndex] : undefined
    return {
      id: session.id,
      items,
      position: Math.min(session.position, items.length),
      previousReview: previousItem && session.lastReview ? {
        item: previousItem,
        rating: session.lastReview.rating,
        previousState: session.lastReview.previousState,
        reviewedAt: session.lastReview.reviewedAt
      } : undefined
    }
  }
}

function toDateKey(date: Date): string {
  const value = new Date(date)
  return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`
}

function calculateStreak(reviewDays: Set<string>, now: Date): number {
  let streak = 0
  const cursor = new Date(now)
  while (reviewDays.has(toDateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
