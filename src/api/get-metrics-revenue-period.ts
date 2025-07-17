import { api } from '@/lib/axios'

export type getDailyRevenueResponse = {
  date: string | null
  receipt: number
}[]

interface getDailyRevenueProps {
  from?: Date
  to?: Date
}

export async function getDailyRevenue({ from, to }: getDailyRevenueProps) {
  console.log(from, to)
  const response = await api.get<getDailyRevenueResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )
  console.log(response)

  return response.data
}

export const GET_METRICS_DAILY_REVENUE = 'metrics-daily-revenue' as const
