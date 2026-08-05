import { expect, test } from '@playwright/test'
import { javaCards } from '../src/data/javaCards'

async function completeOnboarding(page: import('@playwright/test').Page) {
  const dialog = page.getByRole('dialog', { name: '首次使用引导' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: '下一步' }).click()
  await dialog.getByRole('button', { name: '下一步' }).click()
  await dialog.getByRole('button', { name: '开始体验' }).click()
  await expect(page).toHaveURL(/\/study$/)
}

test('resumes the daily session and rerates only the previous card', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: '今天，先记住一点' })).toBeVisible()
  await expect(page.getByText('5 张新卡')).toBeVisible()
  await completeOnboarding(page)
  await expect(page.getByText(javaCards[0].question)).toBeVisible()
  await expect(page.getByText(`${javaCards[0].importance} 级 · ${javaCards[0].score} 分`)).toBeVisible()
  await expect(page.getByText('30 秒回答')).toBeHidden()

  await page.getByRole('button', { name: '查看答案' }).click()
  await expect(page.getByText('30 秒回答')).toBeVisible()
  await page.getByRole('button', { name: /轻松/ }).click()
  await expect(page.getByText(javaCards[1].question)).toBeVisible()

  await page.reload()
  await expect(page.getByText(javaCards[1].question)).toBeVisible()

  await page.getByRole('button', { name: '查看上一题' }).click()
  await expect(page.getByText(javaCards[0].question)).toBeVisible()
  await expect(page.getByRole('button', { name: '查看上一题' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /轻松/ })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: /忘记/ }).click()
  await expect(page.getByRole('button', { name: /忘记/ })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: '回到当前题' }).click()
  await expect(page.getByText(javaCards[1].question)).toBeVisible()
})

test('navigates the library, statistics, and settings', async ({ page }) => {
  await page.goto('/')
  await completeOnboarding(page)

  await page.getByRole('link', { name: '牌组', exact: true }).last().click()
  await expect(page.getByRole('heading', { name: 'Java 后端面试重点牌组' })).toBeVisible()
  await expect(page.locator('.card-list-item')).toHaveCount(165)
  await page.getByRole('button', { name: '仅看 A 级' }).click()
  await expect(page.locator('.card-list-item')).toHaveCount(93)

  await page.getByRole('link', { name: '统计', exact: true }).last().click()
  await expect(page.getByRole('heading', { name: '学习统计' })).toBeVisible()

  await page.getByRole('link', { name: '设置', exact: true }).last().click()
  await expect(page.getByRole('heading', { name: '学习设置' })).toBeVisible()
  await page.getByLabel('每日新卡').fill('3')
  await page.getByRole('button', { name: '保存设置' }).click()
  await expect(page.getByRole('button', { name: '已保存' })).toBeVisible()

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: '导出备份' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/^recall-stack-backup-\d{4}-\d{2}-\d{2}\.json$/)
})

test('creates a personal card through the local review workflow and restores its backup', async ({ page }) => {
  await page.goto('/')
  await completeOnboarding(page)
  await page.getByRole('link', { name: '拆卡', exact: true }).last().click()

  await page.getByLabel('资料内容').fill('# Java 并发\n\n## 线程池原理\n\n线程池复用工作线程执行任务。\n\n- 控制并发数量')
  await page.getByRole('button', { name: '生成卡片草稿' }).click()
  await expect(page.getByLabel('问题')).toHaveValue('线程池原理是什么？')
  await page.getByLabel('延伸追问').fill('如何设置核心线程数？')
  await page.getByRole('button', { name: '确认全部可用草稿' }).click()
  await expect(page.getByText('已将 1 张草稿加入个人资料牌组')).toBeVisible()

  await page.getByRole('link', { name: '牌组', exact: true }).last().click()
  await page.getByRole('button', { name: '我的资料牌组' }).click()
  await expect(page.getByText('线程池原理是什么？')).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: '我的资料牌组' }).click()
  await expect(page.getByText('线程池原理是什么？')).toBeVisible()

  await page.getByRole('link', { name: '设置', exact: true }).last().click()
  await page.getByRole('button', { name: '重置学习进度' }).click()
  await page.getByRole('button', { name: '确认重置' }).click()
  await page.getByRole('link', { name: '学习', exact: true }).last().click()
  await page.getByRole('button', { name: '查看答案' }).click()
  await page.getByRole('button', { name: /记得/ }).click()
  await expect(page.getByText('线程池原理是什么？')).toBeVisible()
  await page.getByRole('button', { name: '查看答案' }).click()
  await page.getByRole('button', { name: /记得/ }).click()

  await page.getByRole('link', { name: '设置', exact: true }).last().click()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: '导出备份' }).click()
  const download = await downloadPromise
  const backupPath = await download.path()
  if (!backupPath) throw new Error('Backup download did not produce a local file')
  await page.getByLabel('导入备份').setInputFiles(backupPath)
  await expect(page.getByText('备份已恢复')).toBeVisible()
})

test('streams AI drafts, retries a failed chunk, and requires review before approval', async ({ page }, testInfo) => {
  let requestCount = 0
  await page.route('https://worker.test/api/card-generation', async (route) => {
    requestCount += 1
    const requestBody = route.request().postDataJSON() as { chunkIndexes?: number[] }
    if (requestCount === 1) {
      expect(requestBody.chunkIndexes).toBeUndefined()
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: sse([
          { type: 'start', requestId: 'e2e-request', totalChunks: 2 },
          { type: 'chunk-start', index: 0, sourceRef: 'java.md / Java 并发' },
          { type: 'drafts', index: 0, drafts: [mockAiDraft('thread-pool', '线程池是什么？', '线程池复用工作线程。')] },
          { type: 'chunk-start', index: 1, sourceRef: 'java.md / Java 并发 / 队列' },
          { type: 'chunk-error', index: 1, message: '该分块生成失败，请稍后重试', retryable: false },
          { type: 'complete', generated: 1, failedChunks: 1 }
        ])
      })
      return
    }
    expect(requestBody.chunkIndexes).toEqual([1])
    await route.fulfill({
      status: 200,
      contentType: 'text/event-stream',
      body: sse([
        { type: 'start', requestId: 'e2e-retry', totalChunks: 1 },
        { type: 'chunk-start', index: 1, sourceRef: 'java.md / Java 并发 / 队列' },
        { type: 'drafts', index: 1, drafts: [mockAiDraft('work-queue', '工作队列有什么作用？', '工作队列保存待执行任务。')] },
        { type: 'complete', generated: 1, failedChunks: 0 }
      ])
    })
  })

  await page.goto('/#/import')
  await page.getByRole('button', { name: 'AI 智能拆卡' }).click()
  await page.getByRole('checkbox', { name: /同意/ }).check()
  await page.getByLabel('资料内容').fill('# Java 并发\n\n线程池复用工作线程。\n\n## 队列\n\n工作队列保存待执行任务。')
  await page.getByRole('button', { name: '生成 AI 卡片草稿' }).click()

  await expect(page.getByLabel('问题').first()).toHaveValue('线程池是什么？')
  await expect(page.getByText('置信度 82%')).toBeVisible()
  await expect(page.getByText('请确认是否需要补充适用边界。')).toBeVisible()
  await page.getByText('查看来源片段').click()
  await expect(page.locator('blockquote').filter({ hasText: '线程池复用工作线程。' })).toBeVisible()
  await expect(page.getByRole('button', { name: '重试失败分块（1）' })).toBeVisible()

  await page.getByRole('button', { name: '重试失败分块（1）' }).click()
  await expect(page.getByLabel('问题')).toHaveCount(2)
  const questions = await page.getByLabel('问题').evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value))
  expect(questions).toContain('工作队列有什么作用？')
  await expect(page.getByRole('button', { name: '重试失败分块（1）' })).toHaveCount(0)
  await page.locator('.draft-section').evaluate((section) => section.scrollIntoView({ block: 'start' }))
  await page.screenshot({ path: testInfo.outputPath('ai-import.png') })

  const threadPoolDraft = page.locator('.draft-card').filter({ has: page.locator('input[value="线程池是什么？"]') })
  await threadPoolDraft.getByRole('button', { name: '完成审核' }).click()
  await threadPoolDraft.getByRole('button', { name: '加入个人牌组' }).click()
  await expect(page.getByText(/已加入个人资料牌组/)).toBeVisible()

  await page.reload()
  await page.getByRole('link', { name: '牌组', exact: true }).last().click()
  await page.getByRole('button', { name: '我的资料牌组' }).click()
  await expect(page.getByText('线程池是什么？')).toBeVisible()
})

function sse(events: unknown[]): string {
  return `${events.map((event) => `data: ${JSON.stringify(event)}`).join('\n\n')}\n\n`
}

function mockAiDraft(id: string, question: string, sourceExcerpt: string) {
  const now = new Date().toISOString()
  return {
    id: `draft-${id}`,
    title: question.replace(/[？?]$/, ''),
    topic: 'Java 并发',
    question,
    coreAnswer: sourceExcerpt,
    explanation: '用于验证 AI 草稿审核流程。',
    keyPoints: [sourceExcerpt],
    followUps: [],
    tags: ['Java', '并发'],
    sourceRef: 'java.md / Java 并发',
    sourceExcerpt,
    confidence: 0.82,
    generationNotes: ['请确认是否需要补充适用边界。'],
    contentHash: (id === 'thread-pool' ? 'c' : 'd').repeat(64),
    quality: 'needs-review',
    provider: 'llm',
    model: 'deepseek-v4-flash',
    promptVersion: 'v0.3-card-generation-1',
    createdAt: now,
    updatedAt: now
  }
}
