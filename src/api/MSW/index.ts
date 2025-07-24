import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getMetricsDayAmountMock } from './get-metrics-day-amount-mock'
import { getMetricsMonthAmountMock } from './get-metrics-month-amount-mock'
import { getMetricsMonthReceiptMock } from './get-metrics-month-receipt'
import { getMetricsMontCancelMock } from './get-metrics-canceled-orders-month'
import { getDailyRevenueMock } from './get-metrics-revenue-period'
import { getPopularProducsMock } from './get-metrics-popular-products'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getMetricsDayAmountMock,
  getMetricsMonthAmountMock,
  getMetricsMonthReceiptMock,
  getMetricsMontCancelMock,
  getDailyRevenueMock,
  getPopularProducsMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return //only allow the MSW to run on test environment
  await worker.start()
}
