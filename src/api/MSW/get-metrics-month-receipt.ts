import { http, HttpResponse } from 'msw'
import type { GetMonthReceiptResponse } from '../get-metrics-month-receipt'

export const getMetricsMonthReceiptMock = http.get<
  never,
  never,
  GetMonthReceiptResponse
>('/metrics/month-receipt', async () => {
  return HttpResponse.json({
    receipt: 250933,
    diffFromLastMonth: 5,
  })
})
