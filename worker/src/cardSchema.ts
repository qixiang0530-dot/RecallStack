import { z } from 'zod'
import { createContentHash } from '../../src/agent/contentHash'
import type { AppCard, CardDraft } from '../../src/domain/types'

const generationNotesSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') return []
  return typeof value === 'string' ? [value] : value
}, z.array(z.string().trim().min(1).max(500)).max(8))

export const llmCardOutputSchema = z.object({
  title: z.string().trim().min(1).max(160),
  topic: z.string().trim().min(1).max(120),
  question: z.string().trim().min(1).max(500),
  coreAnswer: z.string().trim().min(1).max(3000),
  explanation: z.string().max(5000),
  keyPoints: z.array(z.string().trim().min(1).max(300)).max(12),
  followUps: z.array(z.string().trim().min(1).max(300)).max(8),
  tags: z.array(z.string().trim().min(1).max(60)).max(10),
  sourceExcerpt: z.string().trim().min(12).max(1200),
  confidence: z.number().min(0).max(1),
  generationNotes: generationNotesSchema
})

export const llmCardsResponseSchema = z.object({
  cards: z.array(llmCardOutputSchema).max(5)
})

export type LlmCardOutput = z.infer<typeof llmCardOutputSchema>

export async function buildLlmDraft(
  output: LlmCardOutput,
  context: { sourceRef: string; sourceContent: string; model: string; promptVersion: string }
): Promise<CardDraft> {
  const sourceExcerpt = resolveSourceExcerpt(context.sourceContent, output.sourceExcerpt)
  if (!sourceExcerpt) throw new Error('来源片段未在原文分块中找到')
  const contentHash = await createContentHash([output.topic, output.question, output.coreAnswer])
  const now = new Date()
  return {
    id: `draft-${contentHash.slice(0, 24)}`,
    title: output.title,
    topic: output.topic,
    question: output.question,
    coreAnswer: output.coreAnswer,
    explanation: output.explanation,
    keyPoints: output.keyPoints,
    followUps: output.followUps,
    tags: output.tags,
    sourceRef: context.sourceRef,
    sourceExcerpt,
    confidence: output.confidence,
    generationNotes: output.generationNotes,
    contentHash,
    quality: 'needs-review',
    provider: 'llm',
    model: context.model,
    promptVersion: context.promptVersion,
    createdAt: now,
    updatedAt: now
  }
}

export function normalizeModelPayload(value: unknown): unknown {
  if (typeof value !== 'string') return value
  const withoutFence = value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  return JSON.parse(withoutFence)
}

function normalize(value: string): string {
  return value.replace(/\s+/g, '').trim()
}

function resolveSourceExcerpt(sourceContent: string, generatedExcerpt: string): string | undefined {
  const normalizedGenerated = normalize(generatedExcerpt)
  const candidates = sourceCandidates(sourceContent)
  const exact = candidates.find((candidate) => normalize(candidate).includes(normalizedGenerated))
  if (exact) return exact

  const generatedComparable = comparableText(generatedExcerpt)
  const best = candidates
    .map((candidate) => ({ candidate, score: diceCoefficient(generatedComparable, comparableText(candidate)) }))
    .sort((first, second) => second.score - first.score)[0]
  if (!best) return undefined
  const candidateComparable = comparableText(best.candidate)
  const lengthRatio = Math.min(generatedComparable.length, candidateComparable.length) / Math.max(generatedComparable.length, candidateComparable.length)
  return best.score >= 0.5 && lengthRatio >= 0.35 ? best.candidate : undefined
}

function sourceCandidates(sourceContent: string): string[] {
  const sentences = sourceContent.match(/[^。！？；\n]+[。！？；]?/g)?.map((value) => value.trim()).filter(Boolean) ?? []
  const windows = sentences.slice(0, -1).map((sentence, index) => `${sentence}${sentences[index + 1]}`)
  const lines = sourceContent.split(/\r?\n/).map((value) => value.trim()).filter(Boolean)
  const paragraphs = sourceContent.split(/(?:\r?\n){2,}/).map((value) => value.trim()).filter(Boolean)
  return [...new Set([...sentences, ...windows, ...lines, ...paragraphs])]
    .filter((value) => value.length >= 12 && value.length <= 1200)
}

function comparableText(value: string): string {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '')
}

function diceCoefficient(first: string, second: string): number {
  if (first === second) return 1
  if (first.length < 2 || second.length < 2) return 0
  const firstPairs = new Set(Array.from({ length: first.length - 1 }, (_, index) => first.slice(index, index + 2)))
  const secondPairs = new Set(Array.from({ length: second.length - 1 }, (_, index) => second.slice(index, index + 2)))
  let overlap = 0
  for (const pair of firstPairs) if (secondPairs.has(pair)) overlap += 1
  return (2 * overlap) / (firstPairs.size + secondPairs.size)
}

export type UserCardWithHash = AppCard & { contentHash?: string }
