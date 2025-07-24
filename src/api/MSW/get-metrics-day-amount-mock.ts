import { http, HttpResponse } from 'msw'
import type { GetDayAmountResponse } from '../get-metrics-day-amount'

export const getMetricsDayAmountMock = http.get<
  never,
  never,
  GetDayAmountResponse
>('/metrics/day-orders-amount', async () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  })
})
