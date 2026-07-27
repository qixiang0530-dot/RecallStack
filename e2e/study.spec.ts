import { expect, test } from '@playwright/test'
import { javaCards } from '../src/data/javaCards'

test('resumes the daily session and rerates only the previous card', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: '今天，先记住一点' })).toBeVisible()
  await expect(page.getByText('5 张新卡')).toBeVisible()

  await page.getByRole('link', { name: /开始今日学习/ }).click()
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
