import type { OrderDetails } from '@/_types/ordersTypes'
import { api } from '@/lib/axios'

interface GetOrderDetailsParams {
  orderId: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<OrderDetails>(`/orders/${orderId}`)
  return response.data
}

export const GET_ORDER_DETAILS_KEY = 'order-details'
