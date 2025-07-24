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
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { updateRestaurantProfileMock } from './update-restaurant-profile-mock'
import { getProfileMock } from './get-profile-mock'
import { getOrdersMock } from './get-orders-mock'
import { getOrderDetailsMock } from './get-order-details-mock'
import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'
import { deliverOrderMock } from './deliver-order-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getMetricsDayAmountMock,
  getMetricsMonthAmountMock,
  getMetricsMonthReceiptMock,
  getMetricsMontCancelMock,
  getDailyRevenueMock,
  getPopularProducsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateRestaurantProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  dispatchOrderMock,
  deliverOrderMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return //only allow the MSW to run on test environment
  await worker.start()
}
