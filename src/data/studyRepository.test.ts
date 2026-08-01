import Dexie from 'dexie'
import { RecallStackDatabase } from './database'
import { seedBuiltInDeck } from './seed'
import { StudyRepository } from './studyRepository'

describe('StudyRepository', () => {
  let database: RecallStackDatabase
  let repository: StudyRepository

  beforeEach(async () => {
    database = new RecallStackDatabase(`test-${crypto.randomUUID()}`)
    await seedBuiltInDeck(database)
    repository = new StudyRepository(database)
  })

  afterEach(async () => {
    database.close()
    await Dexie.delete(database.name)
  })

  it('creates a study queue using the saved daily limit', async () => {
    const queue = await repository.getStudyQueue(new Date('2026-07-21T08:00:00.000Z'))

    expect(queue).toHaveLength(5)
    expect(queue.every((item) => item.isNew)).toBe(true)
  })

  it('freezes the daily session across repository instances', async () => {
    const morning = new Date('2026-07-21T08:00:00.000Z')
    const firstSession = await repository.getDailyStudySession(morning)
    await repository.saveSettings({ dailyNewLimit: 8, dailyReviewLimit: 20 })

    const reloadedRepository = new StudyRepository(database)
    const sameDaySession = await reloadedRepository.getDailyStudySession(new Date('2026-07-21T12:00:00.000Z'))
    const nextDaySession = await reloadedRepository.getDailyStudySession(new Date('2026-07-22T08:00:00.000Z'))

    expect(sameDaySession.id).toBe(firstSession.id)
    expect(sameDaySession.items.map((item) => item.card.id)).toEqual(firstSession.items.map((item) => item.card.id))
    expect(sameDaySession.items).toHaveLength(5)
    expect(nextDaySession.id).not.toBe(firstSession.id)
    expect(nextDaySession.items).toHaveLength(8)
  })

  it('persists a rating and review log', async () => {
    const now = new Date('2026-07-21T08:00:00.000Z')
    await repository.reviewCard('java-hashmap-thread-safety', 3, now)

    const state = await database.reviewStates.get('java-hashmap-thread-safety')
    expect(state?.reviewCount).toBe(1)
    expect(state?.lastRating).toBe(3)
    expect(await database.reviewLogs.count()).toBe(1)
  })

  it('rerates only the most recently completed session card', async () => {
    const reviewedAt = new Date('2026-07-21T08:00:00.000Z')
    const session = await repository.getDailyStudySession(reviewedAt)
    const firstCard = session.items[0].card

    await repository.reviewDailySessionCard(session.id, firstCard.id, 4, reviewedAt)
    const easyState = await database.reviewStates.get(firstCard.id)
    const advancedSession = await repository.getDailyStudySession(reviewedAt)

    await repository.rerateLastSessionCard(session.id, 1)
    const againState = await database.reviewStates.get(firstCard.id)
    const correctedSession = await repository.getDailyStudySession(reviewedAt)
    const logs = await database.reviewLogs.toArray()

    expect(advancedSession.position).toBe(1)
    expect(advancedSession.previousReview?.item.card.id).toBe(firstCard.id)
    expect(correctedSession.position).toBe(1)
    expect(correctedSession.previousReview?.rating).toBe(1)
    expect(logs).toHaveLength(1)
    expect(logs[0].rating).toBe(1)
    expect(againState?.reviewCount).toBe(1)
    expect(againState?.due.getTime()).toBeLessThan(easyState!.due.getTime())
  })

  it('resets learning progress without deleting built-in cards', async () => {
    await repository.reviewCard('java-hashmap-thread-safety', 3, new Date())
    await repository.resetProgress(new Date('2026-07-21T08:00:00.000Z'))

    expect(await database.cards.count()).toBe(165)
    expect(await database.reviewLogs.count()).toBe(0)
    expect(await database.studySessions.count()).toBe(0)
    expect((await database.reviewStates.toArray()).every((state) => state.reviewCount === 0)).toBe(true)
  })

  it('rejects daily limits outside the supported range', async () => {
    await expect(repository.saveSettings({ dailyNewLimit: 0, dailyReviewLimit: 20 })).rejects.toThrow()
  })

  it('exports and restores all local learning data', async () => {
    const reviewedAt = new Date('2026-07-21T08:00:00.000Z')
    const session = await repository.getDailyStudySession(reviewedAt)
    await repository.saveSettings({ dailyNewLimit: 8, dailyReviewLimit: 40 })
    await repository.reviewDailySessionCard(session.id, session.items[0].card.id, 2, reviewedAt)
    const backup = await repository.exportBackup()

    await repository.resetProgress(new Date('2026-07-22T08:00:00.000Z'))
    await repository.saveSettings({ dailyNewLimit: 3, dailyReviewLimit: 10 })
    await repository.importBackup(backup)

    const restoredState = await database.reviewStates.get(session.items[0].card.id)
    const restoredLog = (await database.reviewLogs.toArray())[0]
    const restoredSession = await database.studySessions.get(session.id)
    expect(await repository.getSettings()).toMatchObject({ dailyNewLimit: 8, dailyReviewLimit: 40 })
    expect(restoredState?.lastRating).toBe(2)
    expect(restoredState?.due).toBeInstanceOf(Date)
    expect(restoredState?.fsrsCard.due).toBeInstanceOf(Date)
    expect(restoredState?.fsrsCard.last_review).toBeInstanceOf(Date)
    expect(restoredLog.review).toBeInstanceOf(Date)
    expect(restoredSession?.lastReview?.reviewedAt).toBeInstanceOf(Date)
    expect(restoredSession?.lastReview?.previousState.due).toBeInstanceOf(Date)
    expect(restoredSession?.createdAt).toBeInstanceOf(Date)
  })

  it('keeps existing data when a backup is invalid', async () => {
    await repository.saveSettings({ dailyNewLimit: 7, dailyReviewLimit: 30 })
    await repository.reviewCard('java-hashmap-thread-safety', 3, new Date('2026-07-21T08:00:00.000Z'))

    await expect(repository.importBackup('{"version":1,"settings":[]}')).rejects.toThrow()

    expect(await repository.getSettings()).toMatchObject({ dailyNewLimit: 7, dailyReviewLimit: 30 })
    expect(await database.reviewLogs.count()).toBe(1)
    expect((await database.reviewStates.get('java-hashmap-thread-safety'))?.lastRating).toBe(3)
  })

  it('exports and restores personal cards and drafts without losing built-in cards', async () => {
    await repository.saveDraft({
      id: 'draft-backup', title: '线程池', topic: '并发', question: '什么是线程池？', coreAnswer: '复用线程。', explanation: '', keyPoints: [], followUps: [], tags: ['线程池'], sourceRef: 'notes.md', quality: 'ready', provider: 'local-rule', createdAt: new Date(), updatedAt: new Date()
    })
    const personalCard = await repository.approveDraft('draft-backup')
    const backup = await repository.exportBackup()

    await database.cards.delete(personalCard.id)
    await database.reviewStates.delete(personalCard.id)
    await database.decks.delete('user-materials')
    await repository.importBackup(backup)

    expect(await database.cards.get(personalCard.id)).toBeDefined()
    expect(await database.cards.where('deckId').equals('java-basics-sample').count()).toBe(165)
    expect(await database.decks.get('user-materials')).toBeDefined()
  })

  it('imports a v1 backup that does not contain v0.2 optional fields', async () => {
    await repository.saveDraft({
      id: 'legacy-import-personal', title: '个人卡片', topic: '个人资料', question: '个人问题？', coreAnswer: '个人答案。', explanation: '', keyPoints: [], followUps: [], tags: [], sourceRef: 'notes.md', quality: 'ready', provider: 'local-rule', createdAt: new Date(), updatedAt: new Date()
    })
    const personalCard = await repository.approveDraft('legacy-import-personal')
    const legacyBackup = JSON.parse(await repository.exportBackup())
    delete legacyBackup.settings.onboardingCompleted
    delete legacyBackup.cards
    delete legacyBackup.decks
    delete legacyBackup.drafts
    legacyBackup.reviewStates = legacyBackup.reviewStates.filter((state: { cardId: string }) => state.cardId !== personalCard.id).slice(0, 10)

    await repository.importBackup(JSON.stringify(legacyBackup))

    expect(await repository.getSettings()).toMatchObject({ onboardingCompleted: false })
    expect(await database.cards.where('deckId').equals('java-basics-sample').count()).toBe(165)
    expect(await database.cards.get(personalCard.id)).toBeUndefined()
    expect(await database.decks.get('user-materials')).toBeUndefined()
    expect(await database.reviewStates.count()).toBe(165)
  })

  it('builds a completion summary for the current daily session', async () => {
    const now = new Date('2026-08-01T08:00:00.000Z')
    const session = await repository.getDailyStudySession(now)
    await repository.reviewDailySessionCard(session.id, session.items[0].card.id, 1, now)
    await repository.reviewDailySessionCard(session.id, session.items[1].card.id, 4, now)

    const summary = await repository.getStudyCompletion(session.id)

    expect(summary).toMatchObject({ completed: 2, total: 5, newCards: 2, reviewCards: 0, ratings: { again: 1, easy: 1 } })
    expect(summary.nextDue).toBeInstanceOf(Date)
  })

  it('excludes older ratings from the current session summary', async () => {
    const sessionTime = new Date('2026-08-01T08:00:00.000Z')
    const session = await repository.getDailyStudySession(sessionTime)
    await repository.reviewCard(session.items[0].card.id, 2, new Date('2026-07-01T08:00:00.000Z'))
    await repository.reviewDailySessionCard(session.id, session.items[0].card.id, 4, sessionTime)

    const summary = await repository.getStudyCompletion(session.id)

    expect(summary.ratings).toMatchObject({ hard: 0, easy: 1 })
  })
})
