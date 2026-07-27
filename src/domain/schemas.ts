import { z } from 'zod'

export const settingsInputSchema = z.object({
  dailyNewLimit: z.number().int().min(1).max(20),
  dailyReviewLimit: z.number().int().min(5).max(200)
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

export const backupSchema = z.object({
  version: z.literal(1),
  exportedAt: dateSchema,
  settings: settingsInputSchema.extend({ id: z.literal('default') }),
  reviewStates: z.array(reviewStateSchema),
  reviewLogs: z.array(reviewLogSchema),
  studySessions: z.array(studySessionSchema)
})
