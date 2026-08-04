import Dexie from 'dexie'
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { RecallStackDatabase } from './database'
import { seedBuiltInDeck } from './seed'
import { StudyRepository } from './studyRepository'
import type { CardDraft } from '../domain/types'
import { createContentHash } from '../agent/contentHash'

describe('draft workflow', () => {
  let database: RecallStackDatabase
  let repository: StudyRepository

  beforeEach(async () => {
    database = new RecallStackDatabase(`draft-test-${crypto.randomUUID()}`)
    await seedBuiltInDeck(database)
    repository = new StudyRepository(database)
  })

  afterEach(async () => {
    database.close()
    await Dexie.delete(database.name)
  })

  it('stores a draft and promotes it to the personal deck after review', async () => {
    const draft: CardDraft = {
      id: 'draft-thread-pool',
      title: '线程池',
      topic: 'Java 并发',
      question: '什么是线程池？',
      coreAnswer: '复用工作线程执行任务。',
      explanation: '线程池可以降低线程创建和销毁成本。',
      keyPoints: ['复用线程'],
      followUps: [],
      tags: ['线程池'],
      sourceRef: 'notes.md · Java 并发 / 线程池',
      quality: 'ready',
      provider: 'local-rule',
      createdAt: new Date('2026-08-01T08:00:00.000Z'),
      updatedAt: new Date('2026-08-01T08:00:00.000Z')
    }

    await repository.saveDraft(draft)
    const card = await repository.approveDraft(draft.id)

    expect(card).toMatchObject({ deckId: 'user-materials', source: 'user', question: draft.question })
    expect(card.contentHash).toBeDefined()
    expect(await database.drafts.get(draft.id)).toBeUndefined()
    expect(await database.cards.get(card.id)).toMatchObject({ deckId: 'user-materials' })
    expect(await database.reviewStates.get(card.id)).toBeDefined()
  })

  it('does not duplicate a card when the same draft is approved twice', async () => {
    const draft = makeDraft('draft-duplicate')
    await repository.saveDraft(draft)
    const firstCard = await repository.approveDraft(draft.id)
    const secondCard = await repository.approveDraft(draft.id)

    expect(secondCard.id).toBe(firstCard.id)
    expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
  })

  it('does not add a second personal card with the same content hash', async () => {
    const first = { ...makeDraft('draft-hash-first'), contentHash: 'same-content-hash' }
    const second = { ...makeDraft('draft-hash-second'), contentHash: 'same-content-hash' }
    await database.drafts.bulkPut([first, second])

    await repository.approveDraft(first.id)
    await repository.approveDraft(second.id)

    expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
  })

  it('does not add duplicate personal cards when approvals run concurrently', async () => {
    const first = makeDraft('draft-race-first')
    const second = { ...makeDraft('draft-race-second'), question: first.question, coreAnswer: first.coreAnswer }
    await database.drafts.bulkPut([first, second])

    await Promise.all([repository.approveDraft(first.id), repository.approveDraft(second.id)])

    expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
  })

  it('recomputes the content hash from the final reviewed fields', async () => {
    const draft = { ...makeDraft('draft-edited-hash'), contentHash: 'stale-worker-hash', question: '编辑后的线程池问题？' }
    await repository.saveDraft(draft)

    const card = await repository.approveDraft(draft.id)

    expect(card.contentHash).toBe(await createContentHash([draft.topic, draft.question, draft.coreAnswer]))
    expect(card.contentHash).not.toBe('stale-worker-hash')
  })

  it('keeps the built-in deck isolated from personal cards', async () => {
    await repository.saveDraft(makeDraft('draft-isolation'))
    await repository.approveDraft('draft-isolation')

    expect(await database.cards.where('deckId').equals('java-basics-sample').count()).toBe(165)
    expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
  })

  it('approves all ready drafts and leaves incomplete drafts for review', async () => {
    const first = makeDraft('draft-batch-first')
    const second = { ...makeDraft('draft-batch-second'), question: '线程池如何控制线程数量？', coreAnswer: '通过核心线程数和最大线程数控制。' }
    const incomplete = { ...makeDraft('draft-batch-incomplete'), question: '', quality: 'needs-review' as const }
    await database.drafts.bulkPut([first, second, incomplete])

    const approved = await repository.approveReadyDrafts()

    expect(approved.map((card) => card.id)).toEqual(['user-draft-batch-first', 'user-draft-batch-second'])
    expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(2)
    expect(await database.drafts.toCollection().primaryKeys()).toEqual(['draft-batch-incomplete'])
  })

  it('reports duplicate drafts skipped during detailed batch approval', async () => {
    const first = { ...makeDraft('draft-detailed-first'), contentHash: 'same-content-hash' }
    const duplicate = { ...makeDraft('draft-detailed-duplicate'), contentHash: 'same-content-hash' }
    await database.drafts.bulkPut([first, duplicate])

    const summary = await repository.approveReadyDraftsDetailed()

    expect(summary.approved).toHaveLength(1)
    expect(summary.skipped).toBe(1)
  })

  it('includes an approved personal card in the FSRS study queue', async () => {
    await repository.saveDraft(makeDraft('draft-study-queue'))
    const card = await repository.approveDraft('draft-study-queue')

    const queue = await repository.getStudyQueue(new Date())

    expect(queue.find((item) => item.card.id === card.id)).toMatchObject({ isNew: true })
  })

  it('orders AI drafts by review risk before other drafts', async () => {
    const local = makeDraft('draft-order-local')
    const highConfidence = { ...makeDraft('draft-order-high'), provider: 'llm' as const, quality: 'needs-review' as const, confidence: 0.95, generationNotes: [] }
    const needsAttention = { ...makeDraft('draft-order-risk'), provider: 'llm' as const, quality: 'needs-review' as const, confidence: 0.45, generationNotes: ['确认版本差异'] }
    await database.drafts.bulkPut([local, highConfidence, needsAttention])

    const ordered = await repository.getDrafts()

    expect(ordered.map((draft) => draft.id)).toEqual(['draft-order-risk', 'draft-order-high', 'draft-order-local'])
  })
})

function makeDraft(id: string): CardDraft {
  const now = new Date('2026-08-01T08:00:00.000Z')
  return {
    id,
    title: '线程池',
    topic: 'Java 并发',
    question: '什么是线程池？',
    coreAnswer: '复用工作线程执行任务。',
    explanation: '',
    keyPoints: ['复用线程'],
    followUps: [],
    tags: ['线程池'],
    sourceRef: 'notes.md · Java 并发 / 线程池',
    quality: 'ready',
    provider: 'local-rule',
    createdAt: now,
    updatedAt: now
  }
}
