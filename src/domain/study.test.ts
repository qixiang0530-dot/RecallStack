import { createEmptyReviewState, createStudyQueue, scheduleReview } from './study'

describe('study scheduling', () => {
  it('places due reviews before unseen cards', () => {
    const now = new Date('2026-07-21T08:00:00.000Z')
    const queue = createStudyQueue({
      cards: [
        { id: 'new-1', isNew: true },
        { id: 'due-1', isNew: false, due: new Date('2026-07-20T08:00:00.000Z') },
        { id: 'future-1', isNew: false, due: new Date('2026-07-22T08:00:00.000Z') }
      ],
      dailyNewLimit: 10,
      reviewLimit: 100,
      now
    })

    expect(queue.map((item) => item.id)).toEqual(['due-1', 'new-1'])
  })

  it('returns different intervals for the four recall ratings', () => {
    const now = new Date('2026-07-21T08:00:00.000Z')
    const reviewState = createEmptyReviewState('card-1', now)

    const schedules = ([1, 2, 3, 4] as const).map((rating) =>
      scheduleReview(reviewState, rating, now).due.getTime()
    )

    expect(new Set(schedules).size).toBe(4)
    expect(schedules).toEqual([...schedules].sort((a, b) => a - b))
  })
})
