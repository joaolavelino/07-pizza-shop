import { http, HttpResponse } from 'msw'
import type { GetMonthCanceledAmountResponse } from '../get-metrics-canceled-orders-month'

export const getMetricsMontCancelMock = http.get<
  never,
  never,
  GetMonthCanceledAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 4,
    diffFromLastMonth: -3,
  })
})
