import { http, HttpResponse } from 'msw'
import type {
  getDailyRevenueProps,
  getDailyRevenueResponse,
} from '../get-metrics-revenue-period'

export const getDailyRevenueMock = http.get<
  never,
  getDailyRevenueProps,
  getDailyRevenueResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01/2024', receipt: 12345 },
    { date: '02/01/2024', receipt: 14325 },
    { date: '03/01/2024', receipt: 15324 },
    { date: '04/01/2024', receipt: 12534 },
    { date: '05/01/2024', receipt: 14235 },
    { date: '06/01/2024', receipt: 13254 },
    { date: '07/01/2024', receipt: 15432 },
  ])
})
