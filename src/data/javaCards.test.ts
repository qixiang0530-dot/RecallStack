import { javaCards } from './javaCards'

const legacyCardIds = [
  'java-hashmap-thread-safety',
  'java-concurrent-hashmap',
  'java-arraylist-linkedlist',
  'java-string-immutable',
  'java-equals-double-equals',
  'java-jvm-memory',
  'java-class-loading',
  'java-synchronized-lock',
  'java-thread-pool',
  'java-spring-bean-lifecycle'
]

describe('formal Java interview cards', () => {
  it('contains the approved S and A scope', () => {
    expect(javaCards).toHaveLength(165)
    expect(javaCards.filter((card) => card.importance === 'S')).toHaveLength(72)
    expect(javaCards.filter((card) => card.importance === 'A')).toHaveLength(93)
    expect(new Set(javaCards.map((card) => card.topic)).size).toBe(11)
  })

  it('keeps every card actionable and traceable', () => {
    for (const card of javaCards) {
      expect(card.coreAnswer.length).toBeGreaterThanOrEqual(30)
      expect(card.explanation.length).toBeGreaterThanOrEqual(40)
      expect(card.keyPoints.length).toBeGreaterThanOrEqual(1)
      expect(card.tags.length).toBeGreaterThanOrEqual(2)
      expect(card.sourceRef).toMatch(/PDF p\.|校招算法基础补充/)
      expect(card.question).not.toContain('�')
      expect(card.coreAnswer).not.toContain('�')
      expect(card.score).toBeGreaterThanOrEqual(card.importance === 'S' ? 8 : 6)
      expect(card.score).toBeLessThanOrEqual(card.importance === 'S' ? 10 : 7)
    }
  })

  it('uses unique stable ids and preserves the original sample ids', () => {
    expect(new Set(javaCards.map((card) => card.id)).size).toBe(javaCards.length)
    for (const cardId of legacyCardIds) expect(javaCards.some((card) => card.id === cardId)).toBe(true)
  })

  it('uses card-specific knowledge keywords', () => {
    const tagSets = new Set(javaCards.map((card) => [...card.tags].sort().join('|')))
    expect(tagSets.size).toBe(javaCards.length)
  })

  it('orders S cards before A cards', () => {
    const firstACard = javaCards.findIndex((card) => card.importance === 'A')
    const lastSCard = javaCards.map((card) => card.importance).lastIndexOf('S')
    expect(lastSCard).toBeLessThan(firstACard)
  })
})
