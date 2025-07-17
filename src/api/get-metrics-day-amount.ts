import { api } from '@/lib/axios'

export interface GetDayAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}

export const GET_METRICS_DAY_AMOUNT = 'metrics-day-amount' as const
