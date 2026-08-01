import { z } from 'zod'

export const settingsInputSchema = z.object({
  dailyNewLimit: z.number().int().min(1).max(20),
  dailyReviewLimit: z.number().int().min(5).max(200),
  onboardingCompleted: z.boolean().optional()
})

const dateSchema = z.coerce.date()
const recallRatingSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])

const fsrsCardSchema = z.object({
  due: dateSchema,
  stability: z.number(),
  difficulty: z.number(),
  elapsed_days: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  reps: z.number(),
  lapses: z.number(),
  state: z.number(),
  last_review: dateSchema.optional()
})

const reviewStateSchema = z.object({
  cardId: z.string().min(1),
  fsrsCard: fsrsCardSchema,
  due: dateSchema,
  reviewCount: z.number().int().nonnegative(),
  lastRating: recallRatingSchema.optional(),
  lastReviewedAt: dateSchema.optional()
})

const reviewLogSchema = z.object({
  id: z.number().int().positive(),
  cardId: z.string().min(1),
  rating: z.number().int(),
  state: z.number().int(),
  due: dateSchema,
  stability: z.number(),
  difficulty: z.number(),
  elapsed_days: z.number(),
  last_elapsed_days: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  review: dateSchema
})

const studySessionSchema = z.object({
  id: z.string().min(1),
  items: z.array(z.object({ cardId: z.string().min(1), isNew: z.boolean() })),
  position: z.number().int().nonnegative(),
  lastReview: z.object({
    cardId: z.string().min(1),
    queueIndex: z.number().int().nonnegative(),
    previousState: reviewStateSchema,
    logId: z.number().int().positive(),
    rating: recallRatingSchema,
    reviewedAt: dateSchema
  }).optional(),
  createdAt: dateSchema,
  updatedAt: dateSchema
})

const appCardSchema = z.object({
  id: z.string().min(1),
  deckId: z.string().min(1),
  order: z.number().int().nonnegative(),
  topic: z.string(),
  importance: z.union([z.literal('S'), z.literal('A')]),
  score: z.number(),
  question: z.string(),
  coreAnswer: z.string(),
  explanation: z.string(),
  keyPoints: z.array(z.string()),
  followUps: z.array(z.string()),
  tags: z.array(z.string()),
  sourceRef: z.string(),
  source: z.union([z.literal('builtin'), z.literal('user'), z.literal('ai-draft')])
})

const deckSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  description: z.string(),
  version: z.number().int().nonnegative(),
  source: z.union([z.literal('builtin'), z.literal('user')]).optional(),
  createdAt: dateSchema
})

export const backupSchema = z.object({
  version: z.literal(1),
  exportedAt: dateSchema,
  settings: settingsInputSchema.extend({ id: z.literal('default') }),
  reviewStates: z.array(reviewStateSchema),
  reviewLogs: z.array(reviewLogSchema),
  studySessions: z.array(studySessionSchema),
  drafts: z.array(z.object({
    id: z.string().min(1),
    title: z.string(),
    topic: z.string(),
    question: z.string(),
    coreAnswer: z.string(),
    explanation: z.string(),
    keyPoints: z.array(z.string()),
    followUps: z.array(z.string()),
    tags: z.array(z.string()),
    sourceRef: z.string(),
    quality: z.union([z.literal('needs-review'), z.literal('ready')]),
    provider: z.literal('local-rule'),
    createdAt: dateSchema,
    updatedAt: dateSchema
  })).optional(),
  cards: z.array(appCardSchema).optional(),
  decks: z.array(deckSchema).optional()
})
