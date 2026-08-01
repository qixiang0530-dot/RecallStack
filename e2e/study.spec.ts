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
