import { test, expect } from '@playwright/test'

test('sign-up success case', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('main')
    .locator('#restaurantName')
    .fill('test-restaurant')
  await page.getByRole('main').locator('#email').fill('test@test.com')
  await page.getByRole('main').locator('#managerName').fill('test-manager-name')
  await page.getByRole('main').locator('#phoneNumber').fill('1234567890')
  await page.getByRole('button', { name: 'Create your account' }).click()

  const toast = page.getByText('Register success')

  await expect(toast).toBeVisible()
})
test('sign-up failure case', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('main')
    .locator('#restaurantName')
    .fill('test-wrong-name')
  await page.getByRole('main').locator('#email').fill('test@test.com')
  await page.getByRole('main').locator('#managerName').fill('test-manager-name')
  await page.getByRole('main').locator('#phoneNumber').fill('1234567890')
  await page.getByRole('button', { name: 'Create your account' }).click()

  const toast = page.getByText('Register failed')

  await expect(toast).toBeVisible()
})

test('navigate to login form', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Login' }).click()

  await expect(page.url()).toContain('sign-in')
})
