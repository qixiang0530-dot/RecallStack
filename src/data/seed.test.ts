import Dexie from 'dexie'
import { createEmptyReviewState } from '../domain/study'
import { RecallStackDatabase } from './database'
import { JAVA_DECK_ID, sampleCards } from './sampleCards'
import { seedBuiltInDeck } from './seed'

describe('built-in deck seeding', () => {
  let database: RecallStackDatabase

  beforeEach(() => {
    database = new RecallStackDatabase(`test-${crypto.randomUUID()}`)
  })

  afterEach(async () => {
    database.close()
    await Dexie.delete(database.name)
  })

  it('does not duplicate cards when the same version is seeded twice', async () => {
    await seedBuiltInDeck(database)
    await seedBuiltInDeck(database)

    expect(await database.decks.count()).toBe(1)
    expect(await database.cards.count()).toBe(165)
  })

  it('upgrades version 1 without replacing progress or settings', async () => {
    const reviewedAt = new Date('2026-07-20T08:00:00.000Z')
    const reviewState = {
      ...createEmptyReviewState('java-hashmap-thread-safety', reviewedAt),
      reviewCount: 3,
      lastRating: 3 as const,
      lastReviewedAt: reviewedAt
    }
    await database.decks.put({
      id: JAVA_DECK_ID,
      name: 'Java 基础测试牌组',
      description: '旧版示例内容',
      version: 1,
      createdAt: reviewedAt
    })
    await database.cards.put(sampleCards[0])
    await database.reviewStates.put(reviewState)
    await database.settings.put({ id: 'default', dailyNewLimit: 9, dailyReviewLimit: 40 })

    await seedBuiltInDeck(database)

    expect((await database.decks.get(JAVA_DECK_ID))?.version).toBe(2)
    expect(await database.cards.count()).toBe(165)
    expect(await database.reviewStates.get(reviewState.cardId)).toEqual(reviewState)
    expect(await database.settings.get('default')).toEqual({
      id: 'default',
      dailyNewLimit: 9,
      dailyReviewLimit: 40
    })
  })
})
