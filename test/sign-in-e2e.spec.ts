import { test, expect } from '@playwright/test'

test('sign-in success case', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  // it's using the baseUrl set on PlayWright config file
  // waitUntil can set a milestone for us to reach until the test set this step as complete (networkIdle means that we're going to way that every js network request is done)

  await page.getByRole('textbox').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Log-in' }).click()

  const toast = page.getByText('Login success')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2000) // just to create a posterior marker in order to Playwright to render the last expected page - It's a bug from playwright that cut the final snapshot
})
test('sign-in fail case - wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('textbox').fill('notjohndoe@example.com')
  await page.getByRole('button', { name: 'Log-in' }).click()

  const toast = page.getByText('Login failed')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})
test('navigate to new restaurant form', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Create an account' }).click()

  expect(page.url()).toContain('sign-up')
})
