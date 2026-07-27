import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dexie from 'dexie'
import { MemoryRouter } from 'react-router-dom'
import { RecallStackDatabase } from '../data/database'
import { javaCards } from '../data/javaCards'
import { seedBuiltInDeck } from '../data/seed'
import { StudyRepository } from '../data/studyRepository'
import { AppProvider } from './AppContext'
import { AppRoutes } from './App'

describe('RecallStack app', () => {
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

  function renderApp(path = '/') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <AppProvider repository={repository} database={database}>
          <AppRoutes />
        </AppProvider>
      </MemoryRouter>
    )
  }

  it('shows today task counts on the home page', async () => {
    renderApp()

    expect(await screen.findByRole('heading', { name: '今天，先记住一点' })).toBeInTheDocument()
    expect(await screen.findByText('5 张新卡')).toBeInTheDocument()
  })

  it('reveals the answer before accepting a rating', async () => {
    const user = userEvent.setup()
    renderApp('/study')

    expect(await screen.findByText(javaCards[0].question)).toBeInTheDocument()
    expect(screen.getByText(`${javaCards[0].importance} 级 · ${javaCards[0].score} 分`)).toBeInTheDocument()
    expect(screen.queryByText('30 秒回答')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '查看答案' }))
    expect(screen.getByText('30 秒回答')).toBeInTheDocument()
    const keyPointsSection = screen.getByText('回答要点').closest('section')
    const explanationSection = screen.getByText('理解补充').closest('section')
    expect(keyPointsSection?.nextElementSibling).toBe(explanationSection)

    await user.click(screen.getByRole('button', { name: /记得/ }))
    await waitFor(() => {
      expect(screen.getByText(javaCards[1].question)).toBeInTheDocument()
    })
  })

  it('filters the deck by importance', async () => {
    const user = userEvent.setup()
    const firstSCard = javaCards.find((card) => card.importance === 'S')!
    const firstACard = javaCards.find((card) => card.importance === 'A')!
    renderApp('/deck')

    expect(await screen.findByText(firstSCard.question)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '仅看 A 级' }))

    expect(screen.queryByText(firstSCard.question)).not.toBeInTheDocument()
    expect(screen.getByText(firstACard.question)).toBeInTheDocument()
    expect(screen.getAllByText(/A 级 · [67] 分/).length).toBeGreaterThan(0)
  })

  it('returns to only the previous card and replaces its rating', async () => {
    const user = userEvent.setup()
    renderApp('/study')

    await user.click(await screen.findByRole('button', { name: '查看答案' }))
    await user.click(screen.getByRole('button', { name: /轻松/ }))
    expect(await screen.findByText(javaCards[1].question)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '查看上一题' }))
    expect(screen.getByText(javaCards[0].question)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '查看上一题' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /轻松/ })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: /忘记/ }))
    await waitFor(async () => {
      expect(await database.reviewLogs.count()).toBe(1)
      expect((await database.reviewStates.get(javaCards[0].id))?.lastRating).toBe(1)
    })

    await user.click(screen.getByRole('button', { name: '回到当前题' }))
    expect(screen.getByText(javaCards[1].question)).toBeInTheDocument()
  })

  it('restores a JSON backup from settings', async () => {
    const user = userEvent.setup()
    await repository.saveSettings({ dailyNewLimit: 9, dailyReviewLimit: 50 })
    const backup = await repository.exportBackup()
    await repository.saveSettings({ dailyNewLimit: 3, dailyReviewLimit: 10 })
    renderApp('/settings')

    expect(await screen.findByRole('button', { name: '导出备份' })).toBeInTheDocument()
    let resolveImport: () => void = () => undefined
    const importCompleted = new Promise<void>((resolve) => { resolveImport = resolve })
    const originalImport = repository.importBackup.bind(repository)
    const importSpy = vi.spyOn(repository, 'importBackup').mockImplementation(async (json) => {
      await originalImport(json)
      resolveImport()
    })
    await act(async () => {
      await user.upload(
        screen.getByLabelText('导入备份'),
        new File([backup], 'recall-stack-backup.json', { type: 'application/json' })
      )
      await importCompleted
      await Promise.resolve()
    })
    importSpy.mockRestore()

    expect(await screen.findByText('备份已恢复')).toBeInTheDocument()
    expect(await repository.getSettings()).toMatchObject({ dailyNewLimit: 9, dailyReviewLimit: 50 })
  })

  it('shows due forecast and weak-card insights in stats', async () => {
    const weakCard = javaCards[0]
    await repository.reviewCard(weakCard.id, 2, new Date('2026-07-24T08:00:00.000Z'))
    await repository.reviewCard(weakCard.id, 2, new Date('2026-07-25T08:00:00.000Z'))
    renderApp('/stats')

    expect(await screen.findByRole('heading', { name: '未来 7 天复习' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '薄弱卡片' })).toBeInTheDocument()
    expect(screen.getByText(weakCard.question)).toBeInTheDocument()
    expect(screen.getByText(`${weakCard.topic} · 1 张薄弱`)).toBeInTheDocument()
  })
})
