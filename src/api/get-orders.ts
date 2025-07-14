import type { OrdersFromList } from '@/_types/ordersTypes'
import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  status?: string | null
  customerName?: string | null
}

export interface GetOrdersResponse {
  orders: OrdersFromList[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders(queries: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: queries.pageIndex || 0,
      orderId: queries.orderId,
      customerName: queries.customerName,
      status: queries.status,
    },
  })

  return response.data
}

export const GET_ORDERS_KEY = 'orders' as const
