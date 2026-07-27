import type { RecallStackDatabase } from './database'
import { javaCards } from './javaCards'
import { JAVA_DECK_ID } from './sampleCards'
import { createEmptyReviewState } from '../domain/study'

export async function seedBuiltInDeck(database: RecallStackDatabase): Promise<void> {
  const existingDeck = await database.decks.get(JAVA_DECK_ID)
  if (existingDeck?.version === 2) return

  const now = new Date()
  await database.transaction('rw', [database.decks, database.cards, database.reviewStates, database.settings], async () => {
    await database.decks.put({
      id: JAVA_DECK_ID,
      name: 'Java 后端面试重点牌组',
      description: '覆盖 Java 基础、框架、数据库、中间件、网络、操作系统与算法的 S/A 级重点知识。',
      version: 2,
      createdAt: existingDeck?.createdAt ?? now
    })
    await database.cards.bulkPut(javaCards)
    const existingStateIds = new Set((await database.reviewStates.toCollection().primaryKeys()).map(String))
    const missingStates = javaCards
      .filter((card) => !existingStateIds.has(card.id))
      .map((card) => createEmptyReviewState(card.id, now))
    if (missingStates.length) {
      await database.reviewStates.bulkPut(missingStates)
    }
    if (!(await database.settings.get('default'))) {
      await database.settings.put({ id: 'default', dailyNewLimit: 5, dailyReviewLimit: 20 })
    }
  })
}
