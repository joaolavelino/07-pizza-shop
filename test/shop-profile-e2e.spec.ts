import { test, expect } from '@playwright/test'

test('update restaurant info success case - dialog close', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Mock Restaurant Name' }).click()
  await page.waitForTimeout(500) // wait the dropdown to open
  await page.getByRole('menuitem', { name: 'Shop Profile' }).click()
  await page.waitForTimeout(500) // wait the dropdown to open
  await page.getByRole('textbox', { name: 'Name' }).fill('New Name')
  await page
    .getByRole('textbox', { name: 'Description' })
    .fill('New Description')
  await page.getByRole('button', { name: 'Save Changes' }).click()

  await page.waitForLoadState('networkidle')
  const toast = page.getByText(
    'Your new restaurant information is already visible for your customers',
  )
  await expect(toast).toBeVisible()

  await page.waitForTimeout(500) // automatically close the dialog
  expect(page.getByRole('heading', { name: 'Shop Profile' })).not.toBeVisible()
  await page.waitForTimeout(500) // automatically close the dialog
})
test('update restaurant info failure case - automatic sign-out', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Mock Restaurant Name' }).click()
  await page.waitForTimeout(500) // wait the dropdown to open
  await page.getByRole('menuitem', { name: 'Shop Profile' }).click()
  await page.waitForTimeout(500) // wait the dropdown to open
  await page.getByRole('textbox', { name: 'Name' }).fill('Wrong Name')
  await page
    .getByRole('textbox', { name: 'Description' })
    .fill('New Description')
  await page.getByRole('button', { name: 'Save Changes' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Update failed')
  await expect(toast).toBeVisible()

  expect(page.url()).toContain('sign-in')
  //check if the user is redirected to the sign-in page
  await page.waitForTimeout(500)
})
