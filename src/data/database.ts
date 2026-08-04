import Dexie, { type EntityTable, type Table } from 'dexie'
import type { AppCard, CardDraft, DeckSource, RecallRating, ReviewLog, ReviewState } from '../domain/types'

export type DeckRecord = {
  id: string
  name: string
  description: string
  version: number
  source?: DeckSource
  createdAt: Date
}

export type SettingsRecord = {
  id: 'default'
  dailyNewLimit: number
  dailyReviewLimit: number
  onboardingCompleted?: boolean
  aiConsentVersion?: string
  aiConsentAcceptedAt?: Date
}

export type StudySessionQueueItem = {
  cardId: string
  isNew: boolean
}

export type StudySessionRecord = {
  id: string
  items: StudySessionQueueItem[]
  position: number
  lastReview?: {
    cardId: string
    queueIndex: number
    previousState: ReviewState
    logId: number
    rating: RecallRating
    reviewedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}

export class RecallStackDatabase extends Dexie {
  decks!: EntityTable<DeckRecord, 'id'>
  cards!: EntityTable<AppCard, 'id'>
  reviewStates!: EntityTable<ReviewState, 'cardId'>
  reviewLogs!: Table<ReviewLog, number>
  settings!: EntityTable<SettingsRecord, 'id'>
  studySessions!: EntityTable<StudySessionRecord, 'id'>
  drafts!: EntityTable<CardDraft, 'id'>

  constructor(name = 'recall-stack') {
    super(name)
    this.version(1).stores({
      decks: 'id, version',
      cards: 'id, deckId, order, topic, source',
      reviewStates: 'cardId',
      reviewLogs: '++id, cardId, review',
      settings: 'id'
    })
    this.version(2).stores({
      studySessions: 'id, updatedAt'
    })
    this.version(3).stores({
      drafts: 'id, quality, updatedAt'
    }).upgrade(async (transaction) => {
      await transaction.table('decks').toCollection().modify((deck: DeckRecord) => {
        deck.source ??= deck.id === 'java-basics-sample' ? 'builtin' : 'user'
      })
      await transaction.table('settings').toCollection().modify((settings: SettingsRecord) => {
        settings.onboardingCompleted ??= false
      })
      })
    this.version(4).stores({
      drafts: 'id, quality, updatedAt'
    }).upgrade(async (transaction) => {
      await transaction.table('drafts').toCollection().modify((draft: CardDraft) => {
        draft.sourceExcerpt ??= ''
        draft.confidence ??= 0
        draft.generationNotes ??= []
        draft.contentHash ??= ''
      })
    })
  }
}

export const database = new RecallStackDatabase()
