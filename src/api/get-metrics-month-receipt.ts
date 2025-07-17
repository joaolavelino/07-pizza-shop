import { api } from '@/lib/axios'

export interface GetMonthReceiptResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthOrderReceipt() {
  const response = await api.get<GetMonthReceiptResponse>(
    '/metrics/month-receipt',
  )

  return response.data
}

export const GET_METRICS_MONTH_RECEIPT = 'metrics-month-receipt' as const
