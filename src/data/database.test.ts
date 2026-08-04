import Dexie from 'dexie'
import { createEmptyReviewState } from '../domain/study'
import { RecallStackDatabase } from './database'

describe('RecallStackDatabase migrations', () => {
  it('adds v3 fields without changing an existing review state', async () => {
    const name = `migration-test-${crypto.randomUUID()}`
    const legacy = new Dexie(name)
    legacy.version(1).stores({
      decks: 'id, version',
      cards: 'id, deckId, order, topic, source',
      reviewStates: 'cardId',
      reviewLogs: '++id, cardId, review',
      settings: 'id'
    })
    legacy.version(2).stores({ studySessions: 'id, updatedAt' })
    const reviewState = createEmptyReviewState('legacy-card', new Date('2026-07-20T08:00:00.000Z'))
    await legacy.open()
    await legacy.table('decks').put({ id: 'java-basics-sample', name: 'Java', description: '', version: 2, createdAt: new Date() })
    await legacy.table('settings').put({ id: 'default', dailyNewLimit: 5, dailyReviewLimit: 20 })
    await legacy.table('reviewStates').put(reviewState)
    legacy.close()

    const migrated = new RecallStackDatabase(name)
    expect((await migrated.decks.get('java-basics-sample'))?.source).toBe('builtin')
    expect((await migrated.settings.get('default'))?.onboardingCompleted).toBe(false)
    expect(await migrated.reviewStates.get('legacy-card')).toEqual(reviewState)
    expect(await migrated.drafts.count()).toBe(0)
    migrated.close()
    await Dexie.delete(name)
  })

  it('adds AI draft metadata without changing legacy drafts or study state', async () => {
    const name = `ai-migration-test-${crypto.randomUUID()}`
    const legacy = new Dexie(name)
    legacy.version(1).stores({
      decks: 'id, version',
      cards: 'id, deckId, order, topic, source',
      reviewStates: 'cardId',
      reviewLogs: '++id, cardId, review',
      settings: 'id'
    })
    legacy.version(2).stores({ studySessions: 'id, updatedAt' })
    legacy.version(3).stores({ drafts: 'id, quality, updatedAt' })
    await legacy.open()
    await legacy.table('drafts').put({
      id: 'legacy-draft',
      title: '旧草稿',
      topic: 'Java',
      question: '旧问题？',
      coreAnswer: '旧答案。',
      explanation: '',
      keyPoints: [],
      followUps: [],
      tags: [],
      sourceRef: 'legacy.md',
      quality: 'needs-review',
      provider: 'local-rule',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    legacy.close()

    const migrated = new RecallStackDatabase(name)
    const draft = await migrated.drafts.get('legacy-draft')
    expect(draft).toMatchObject({ sourceExcerpt: '', confidence: 0, generationNotes: [], contentHash: '' })
    migrated.close()
    await Dexie.delete(name)
  })
})
