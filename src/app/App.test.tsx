import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    await database.settings.put({ id: 'default', dailyNewLimit: 5, dailyReviewLimit: 20, onboardingCompleted: true })
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

  it('generates, edits, and approves a material card draft', async () => {
    const user = userEvent.setup()
    renderApp('/import')

    await user.type(await screen.findByLabelText('资料内容'), '## 线程池原理\n\n线程池复用工作线程执行任务。\n\n- 控制并发数量')
    await user.click(screen.getByRole('button', { name: '生成卡片草稿' }))

    expect(await screen.findByDisplayValue('线程池原理是什么？')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '加入个人牌组' }))

    await waitFor(async () => {
      expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
    })
    expect(screen.getByText('已加入个人资料牌组')).toBeInTheDocument()
  })

  it('shows a three-step onboarding guide for a new local profile', async () => {
    const user = userEvent.setup()
    await database.settings.put({ id: 'default', dailyNewLimit: 5, dailyReviewLimit: 20, onboardingCompleted: false })
    renderApp('/')

    expect(await screen.findByRole('dialog', { name: '首次使用引导' })).toBeInTheDocument()
    expect(screen.getByText('先主动回忆，再查看答案')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '下一步' }))
    expect(screen.getByText('用四档评分安排复习')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '下一步' }))
    expect(screen.getByText('记录只保存在当前浏览器')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '开始体验' }))
    await waitFor(async () => expect((await repository.getSettings()).onboardingCompleted).toBe(true))
  })

  it('lets a new user enter the Java demo without stepping through onboarding', async () => {
    const user = userEvent.setup()
    await database.settings.put({ id: 'default', dailyNewLimit: 5, dailyReviewLimit: 20, onboardingCompleted: false })
    renderApp('/')

    await user.click(await screen.findByRole('button', { name: '直接体验 Java Demo' }))

    expect(await screen.findByText(javaCards[0].question)).toBeInTheDocument()
    expect((await repository.getSettings()).onboardingCompleted).toBe(true)
  })

  it('supports keyboard reveal and rating during study', async () => {
    const user = userEvent.setup()
    renderApp('/study')
    await screen.findByText(javaCards[0].question)

    await user.keyboard(' ')
    expect(await screen.findByText('30 秒回答')).toBeInTheDocument()
    await user.keyboard('4')
    expect(await screen.findByText(javaCards[1].question)).toBeInTheDocument()
  })

  it('does not trigger study shortcuts while editing an input', async () => {
    const user = userEvent.setup()
    renderApp('/study')
    await screen.findByText(javaCards[0].question)
    const input = document.createElement('input')
    document.body.appendChild(input)

    await user.click(input)
    await user.keyboard(' 4')

    expect(screen.getByText(javaCards[0].question)).toBeInTheDocument()
    expect(await database.reviewLogs.count()).toBe(0)
    input.remove()
  })

  it('shows the personal deck without mixing built-in cards', async () => {
    const user = userEvent.setup()
    await repository.saveDraft({
      id: 'deck-switch-card',
      title: '线程池',
      topic: 'Java 并发',
      question: '个人资料中的线程池问题？',
      coreAnswer: '复用工作线程。',
      explanation: '',
      keyPoints: ['复用线程'],
      followUps: ['如何设置核心线程数？'],
      tags: ['线程池', '并发'],
      sourceRef: 'notes.md · 线程池',
      quality: 'ready',
      provider: 'local-rule',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await repository.approveDraft('deck-switch-card')
    renderApp('/deck')

    await user.click(await screen.findByRole('button', { name: '我的资料牌组' }))

    expect(screen.getByRole('heading', { name: '我的资料牌组' })).toBeInTheDocument()
    expect(screen.getByText('个人资料中的线程池问题？')).toBeInTheDocument()
    expect(screen.queryByText(javaCards[0].question)).not.toBeInTheDocument()
  })

  it('batch approves ready drafts and preserves tags and follow-ups', async () => {
    const user = userEvent.setup()
    renderApp('/import')
    await user.type(await screen.findByLabelText('资料内容'), '## 什么是线程池\n线程池复用工作线程执行任务。')
    await user.click(screen.getByRole('button', { name: '生成卡片草稿' }))
    await screen.findByDisplayValue('什么是线程池？')

    fireEvent.change(screen.getByLabelText('关键词'), { target: { value: '线程池\n并发' } })
    await user.type(screen.getByLabelText('延伸追问'), '如何设置核心线程数？')
    await user.click(screen.getByRole('button', { name: '确认全部可用草稿' }))

    await waitFor(async () => {
      expect(await database.cards.where('deckId').equals('user-materials').count()).toBe(1)
    })
    const card = (await database.cards.where('deckId').equals('user-materials').first())!
    expect(card.tags).toEqual(['线程池', '并发'])
    expect(card.followUps).toEqual(['如何设置核心线程数？'])
  })

  it('does not allow an incomplete draft to enter the personal deck', async () => {
    await repository.saveDraft({
      id: 'incomplete-draft', title: '待整理', topic: '未分类资料', question: '', coreAnswer: '', explanation: '', keyPoints: ['只有列表'], followUps: [], tags: [], sourceRef: 'notes.md', quality: 'needs-review', provider: 'local-rule', createdAt: new Date(), updatedAt: new Date()
    })
    renderApp('/import')

    expect(await screen.findByRole('button', { name: '加入个人牌组' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '确认全部可用草稿' })).toBeDisabled()
  })

  it('shows a session summary after the final card', async () => {
    const user = userEvent.setup()
    await repository.saveSettings({ dailyNewLimit: 1, dailyReviewLimit: 20, onboardingCompleted: true })
    renderApp('/study')
    await screen.findByText(javaCards[0].question)
    await user.keyboard(' ')
    await user.keyboard('3')

    expect(await screen.findByRole('heading', { name: '今天到这里' })).toBeInTheDocument()
    expect(screen.getByText(/完成 1 \/ 1 张卡片/)).toBeInTheDocument()
    expect(screen.getByText('新卡')).toBeInTheDocument()
    expect(screen.getByText('记得 / 轻松')).toBeInTheDocument()
  })
})
