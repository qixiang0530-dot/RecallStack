import type { AppCard, CardDraft, RecallRating, ReviewState } from '../domain/types'
import { createEmptyReviewState, createStudyQueue, scheduleReviewWithLog } from '../domain/study'
import { backupSchema, settingsInputSchema } from '../domain/schemas'
import { USER_DECK_ID } from './sampleCards'
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

export type StudyCompletion = {
  completed: number
  total: number
  newCards: number
  reviewCards: number
  ratings: { again: number; hard: number; good: number; easy: number }
  nextDue?: Date
}

export class StudyRepository {
  constructor(private readonly database: RecallStackDatabase) {}

  async getSettings(): Promise<SettingsRecord> {
    const settings = await this.database.settings.get('default')
    if (settings) return { ...settings, onboardingCompleted: settings.onboardingCompleted ?? false }
    return {
      id: 'default',
      dailyNewLimit: 5,
      dailyReviewLimit: 20,
      onboardingCompleted: false
    }
  }

  async saveSettings(settings: Omit<SettingsRecord, 'id'>): Promise<void> {
    const validated = settingsInputSchema.parse(settings)
    const current = await this.getSettings()
    await this.database.settings.put({ ...current, ...validated, id: 'default' })
  }

  async completeOnboarding(): Promise<void> {
    const settings = await this.getSettings()
    await this.database.settings.put({ ...settings, id: 'default', onboardingCompleted: true })
  }

  async getDrafts(): Promise<CardDraft[]> {
    return this.database.drafts.orderBy('updatedAt').reverse().toArray()
  }

  async saveDraft(draft: CardDraft): Promise<void> {
    await this.database.drafts.put(draft)
  }

  async deleteDraft(id: string): Promise<void> {
    await this.database.drafts.delete(id)
  }

  async approveDraft(id: string): Promise<AppCard> {
    const existing = await this.database.cards.get(`user-${id}`)
    if (existing) return existing
    const draft = await this.database.drafts.get(id)
    if (!draft) throw new Error(`Draft not found: ${id}`)
    if (draft.quality !== 'ready' || !draft.question.trim() || !draft.coreAnswer.trim()) {
      throw new Error(`Draft is not ready: ${id}`)
    }
    const now = new Date()
    const card: AppCard = {
      id: `user-${draft.id}`,
      deckId: USER_DECK_ID,
      order: (await this.database.cards.where('deckId').equals(USER_DECK_ID).count()) + 1,
      topic: draft.topic,
      importance: 'A',
      score: 5,
      question: draft.question,
      coreAnswer: draft.coreAnswer,
      explanation: draft.explanation,
      keyPoints: draft.keyPoints,
      followUps: draft.followUps,
      tags: draft.tags,
      sourceRef: draft.sourceRef,
      source: 'user'
    }
    await this.database.transaction('rw', [this.database.decks, this.database.cards, this.database.reviewStates, this.database.drafts], async () => {
      const deck = await this.database.decks.get(USER_DECK_ID)
      if (!deck) {
        await this.database.decks.put({ id: USER_DECK_ID, name: '我的资料牌组', description: '由资料拆卡流程审核确认的个人知识卡片。', version: 1, source: 'user', createdAt: now })
      }
      await this.database.cards.put(card)
      await this.database.reviewStates.put(createEmptyReviewState(card.id, now))
      await this.database.drafts.delete(id)
    })
    return card
  }

  async approveReadyDrafts(): Promise<AppCard[]> {
    const drafts = await this.database.drafts.toArray()
    const readyDrafts = drafts.filter((draft) => draft.quality === 'ready' && draft.question.trim() && draft.coreAnswer.trim())
    const approved: AppCard[] = []
    for (const draft of readyDrafts) {
      approved.push(await this.approveDraft(draft.id))
    }
    return approved
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

  async getStudyCompletion(sessionId: string): Promise<StudyCompletion> {
    const session = await this.database.studySessions.get(sessionId)
    if (!session) throw new Error(`Study session not found: ${sessionId}`)
    const logs = await this.database.reviewLogs.toArray()
    const sessionCardIds = new Set(session.items.slice(0, session.position).map((item) => item.cardId))
    const sessionLogs = logs.filter((log) => sessionCardIds.has(log.cardId) && log.review >= session.createdAt)
    const ratings = {
      again: sessionLogs.filter((log) => log.rating === 1).length,
      hard: sessionLogs.filter((log) => log.rating === 2).length,
      good: sessionLogs.filter((log) => log.rating === 3).length,
      easy: sessionLogs.filter((log) => log.rating === 4).length
    }
    const nextDueValues = (await this.database.reviewStates.bulkGet([...sessionCardIds])).map((state) => state?.due).filter((due): due is Date => due instanceof Date)
    return {
      completed: session.position,
      total: session.items.length,
      newCards: session.items.slice(0, session.position).filter((item) => item.isNew).length,
      reviewCards: session.items.slice(0, session.position).filter((item) => !item.isNew).length,
      ratings,
      nextDue: nextDueValues.sort((first, second) => first.getTime() - second.getTime())[0]
    }
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
    const [settings, reviewStates, reviewLogs, studySessions, drafts, decks, cards] = await Promise.all([
      this.getSettings(),
      this.database.reviewStates.toArray(),
      this.database.reviewLogs.toArray(),
      this.database.studySessions.toArray(),
      this.database.drafts.toArray(),
      this.database.decks.toArray(),
      this.database.cards.toArray()
    ])
    return JSON.stringify({
      version: 1,
      exportedAt: new Date(),
      settings,
      reviewStates,
      reviewLogs,
      studySessions,
      drafts,
      decks,
      cards
    }, null, 2)
  }

  async importBackup(json: string): Promise<void> {
    const backup = backupSchema.parse(JSON.parse(json))
    await this.database.transaction(
      'rw',
      [this.database.settings, this.database.reviewStates, this.database.reviewLogs, this.database.studySessions, this.database.drafts, this.database.decks, this.database.cards],
      async () => {
        const currentUserCardIds = (await this.database.cards.where('source').equals('user').primaryKeys()).map(String)
        const currentUserDeckIds = (await this.database.decks.toArray()).filter((deck) => deck.source === 'user').map((deck) => deck.id)
        await Promise.all([
          this.database.settings.clear(),
          this.database.reviewStates.clear(),
          this.database.reviewLogs.clear(),
          this.database.studySessions.clear(),
          this.database.drafts.clear()
        ])
        if (currentUserCardIds.length) await this.database.cards.bulkDelete(currentUserCardIds)
        if (currentUserDeckIds.length) await this.database.decks.bulkDelete(currentUserDeckIds)
        if (backup.cards) {
          await this.database.cards.bulkPut(backup.cards.filter((card) => card.source === 'user'))
        }
        if (backup.decks) {
          await this.database.decks.bulkPut(backup.decks.filter((deck) => deck.source === 'user' || deck.id === USER_DECK_ID))
        }
        await this.database.settings.put({ ...backup.settings, onboardingCompleted: backup.settings.onboardingCompleted ?? false })
        const cardIds = (await this.database.cards.toCollection().primaryKeys()).map(String)
        const cardIdSet = new Set(cardIds)
        const restoredStates = backup.reviewStates.filter((state) => cardIdSet.has(state.cardId))
        const restoredStateIds = new Set(restoredStates.map((state) => state.cardId))
        const missingStates = cardIds.filter((cardId) => !restoredStateIds.has(cardId)).map((cardId) => createEmptyReviewState(cardId, new Date()))
        await this.database.reviewStates.bulkPut([...restoredStates, ...missingStates])
        await this.database.reviewLogs.bulkPut(backup.reviewLogs)
        await this.database.studySessions.bulkPut(backup.studySessions)
        if (backup.drafts) await this.database.drafts.bulkPut(backup.drafts)
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
