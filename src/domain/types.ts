import type { Card as FsrsCard, ReviewLog as FsrsReviewLog } from 'ts-fsrs'

export type RecallRating = 1 | 2 | 3 | 4
export type CardImportance = 'S' | 'A'
export type DeckSource = 'builtin' | 'user'

export type MaterialInput = {
  name: string
  content: string
}

export type CardDraft = {
  id: string
  title: string
  topic: string
  question: string
  coreAnswer: string
  explanation: string
  keyPoints: string[]
  followUps: string[]
  tags: string[]
  sourceRef: string
  sourceExcerpt?: string
  confidence?: number
  generationNotes?: string[]
  contentHash?: string
  quality: 'needs-review' | 'ready'
  provider: 'local-rule' | 'llm'
  model?: string
  promptVersion?: string
  createdAt: Date
  updatedAt: Date
}

export type AppCard = {
  id: string
  deckId: string
  order: number
  topic: string
  importance: CardImportance
  score: number
  question: string
  coreAnswer: string
  explanation: string
  keyPoints: string[]
  followUps: string[]
  tags: string[]
  sourceRef: string
  contentHash?: string
  source: 'builtin' | 'user' | 'ai-draft'
}

export type ReviewState = {
  cardId: string
  fsrsCard: FsrsCard
  due: Date
  reviewCount: number
  lastRating?: RecallRating
  lastReviewedAt?: Date
}

export type ReviewLog = FsrsReviewLog & {
  id?: number
  cardId: string
}

export type QueueCandidate = {
  id: string
  isNew: boolean
  due?: Date
}
