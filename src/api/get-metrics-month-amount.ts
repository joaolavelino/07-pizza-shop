import { api } from '@/lib/axios'

export interface GetMonthAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}

export const GET_METRICS_MONTH_AMOUNT = 'metrics-month-amount' as const
