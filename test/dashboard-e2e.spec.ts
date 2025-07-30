import { popularProductsList } from '@/api/MSW/get-metrics-popular-products'
import { test, expect } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(page.getByText('20', { exact: true })).toBeVisible()
  expect(page.getByText('-5% over yesterday')).toBeVisible()
})
test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(page.getByText('400', { exact: true })).toBeVisible()
  expect(page.getByText('25% over last month')).toBeVisible()
})
test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(page.getByText('€2,509.33')).toBeVisible()
  expect(page.getByText('5% over last month', { exact: true })).toBeVisible()
})
test('display month canceled orders metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(page.getByText('4', { exact: true })).toBeVisible()
  expect(page.getByText('-3% over last month', { exact: true })).toBeVisible()
})
test('display list of favorite products', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  popularProductsList.forEach((product) => {
    expect(page.getByRole('cell', { name: product.product })).toBeVisible()
  })
})
