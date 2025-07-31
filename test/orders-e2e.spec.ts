import { statusArray } from '@/api/MSW/get-orders-mock'
import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await expect(page.getByText('Total of 63 items')).toBeVisible() //correct number of orders
  for (let i = 0; i <= 9; i++) {
    await expect(
      page.getByRole('cell', { name: `mock-order-id-${i + 1}`, exact: true }),
    ).toBeVisible()
  } // expect that the 10 first orders are being displayed
  await page.waitForTimeout(500)
})
test('navigate to different pages', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Next page' }).click()
  for (let i = 0; i <= 9; i++) {
    await expect(
      page.getByRole('cell', { name: `mock-order-id-${i + 11}`, exact: true }),
    ).toBeVisible()
  } // expect that the orders 11-20 are being displayed
  await page.waitForTimeout(500)

  await page.getByRole('button', { name: 'Last page' }).click()

  await expect(
    page.getByRole('cell', { name: `mock-order-id-63`, exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Previous page' }).click()

  for (let i = 0; i <= 9; i++) {
    await expect(
      page.getByRole('cell', { name: `mock-order-id-${i + 51}`, exact: true }),
    ).toBeVisible()
  } // expect that the orders 51-60 are being displayed
  await page.getByRole('button', { name: 'First page' }).click()
  for (let i = 0; i <= 9; i++) {
    await expect(
      page.getByRole('cell', { name: `mock-order-id-${i + 1}`, exact: true }),
    ).toBeVisible()
  } // expect that the orders 1-10 are being displayed
})
test('filter by status - pending', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('combobox').click()
  await page.waitForTimeout(500)
  await page.getByRole('option', { name: 'Pending' }).click()
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Filter results' }).click()
  await page.waitForTimeout(500)
  const pendingInstances = await page
    .getByRole('cell', { name: 'Pending' })
    .all()
  await expect(pendingInstances).toHaveLength(10) //12 because it counts the 10 items, the combobox button and the option inside of it. Locator finds everything on the DOM, even if it's not visible. So the length is 12. I could iterate on each item and assert it's visibility, one would return an error.
  statusArray.forEach(async (status) => {
    if (status !== 'pending')
      await await expect(page.getByText(status)).not.toBeVisible()
  })
  await page.waitForTimeout(500)
})
test('filter by order Id and reset', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Order Id' }).fill('mock-order-id-63')
  await page.getByRole('button', { name: 'Filter results' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Total of 1 item')).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'mock-order-id-63' }),
  ).toBeVisible()

  //Reset Filter
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Total of 63 item')).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'mock-order-id-10' }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'mock-order-id-63' }),
  ).not.toBeVisible()
})
test('filter by customer and reset', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Order Id' }).fill('63')
  await page.getByRole('button', { name: 'Filter results' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Total of 1 item')).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Mock Customer Name - 63' }),
  ).toBeVisible()

  //Reset Filter
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Total of 63 item')).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'mock-order-id-10' }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Mock Customer Name - 63' }),
  ).not.toBeVisible()
})
test('approve an order using table row', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('combobox').click()
  await page.waitForTimeout(500)
  await page.getByRole('option', { name: 'Pending' }).click()
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Filter results' }).click()
  await page.waitForTimeout(500)

  const firstRow = page
    .getByRole('row', {
      name: 'Order Details mock-order-id-4',
    })
    .nth(1)

  console.log(firstRow.evaluate((el) => el.outerHTML))

  await firstRow.getByRole('button', { name: 'Approve' }).click()
  //   await page.waitForTimeout(500)
  await expect(
    page.getByText('The order mock-order-id-44 was approved'),
  ).toBeVisible()
})
test('display the order details and close the dialog', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page
    .getByRole('row', { name: 'Order Details mock-order-id-3' })
    .getByRole('button', { name: 'Order Details' })
    .click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Order Id#: mock-order-id-3')).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).first().click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Order Id#: mock-order-id-3')).not.toBeVisible()
})
test('trigger next step using order details', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  page
    .getByRole('row', {
      name: 'Order Details mock-order-id-1 ',
    })
    .getByRole('button')
    .first()
    .click()

  await page.waitForTimeout(500)

  await page.getByRole('button', { name: 'Approve' }).click()
  await expect(page.getByText(' was approved')).toBeVisible()
})

test('cancel the order from table row', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page
    .getByRole('row', { name: 'Order Details mock-order-id-3' })
    .getByRole('button', { name: 'Cancel' })
    .click()
  await page.waitForTimeout(500)
  await expect(
    page.getByRole('heading', { name: 'Cancel Order Confirmation' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Confirm' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('The order mock-order-id-3 was cancelled'))
  await page.waitForTimeout(500)
  await expect(
    page.getByRole('heading', { name: 'Cancel Order Confirmation' }),
  ).not.toBeVisible()
})
test('cancel the order from order details', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page
    .getByRole('row', { name: 'Order Details mock-order-id-3' })
    .getByRole('button', { name: 'Order Details' })
    .click()
  await page.waitForTimeout(500)
  await expect(page.getByText('Order Id#: mock-order-id-3')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).first().click()
  await page.waitForTimeout(500)
  await expect(
    page.getByRole('heading', { name: 'Cancel Order Confirmation' }),
  ).toBeVisible()
  await expect(page.getByText('Order Id#: mock-order-id-3')).not.toBeVisible()
  await page.getByRole('button', { name: 'Confirm' }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText('The order mock-order-id-3 was cancelled'))
  await page.waitForTimeout(500)
  await expect(
    page.getByRole('heading', { name: 'Cancel Order Confirmation' }),
  ).not.toBeVisible()
  await expect(page.getByText('Order Id#: mock-order-id-3')).toBeVisible()
})
