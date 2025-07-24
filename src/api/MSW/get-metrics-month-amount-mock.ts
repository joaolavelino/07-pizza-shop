import { http, HttpResponse } from 'msw'
import type { GetMonthAmountResponse } from '../get-metrics-month-amount'

export const getMetricsMonthAmountMock = http.get<
  never,
  never,
  GetMonthAmountResponse
>('/metrics/month-orders-amount', async () => {
  return HttpResponse.json({
    amount: 20,
    diffFromLastMonth: -5,
  })
})
