import Dexie, { type EntityTable, type Table } from 'dexie'
import type { AppCard, RecallRating, ReviewLog, ReviewState } from '../domain/types'

export type DeckRecord = {
  id: string
  name: string
  description: string
  version: number
  createdAt: Date
}

export type SettingsRecord = {
  id: 'default'
  dailyNewLimit: number
  dailyReviewLimit: number
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
  }
}

export const database = new RecallStackDatabase()
