import type { OrderDetails } from '@/_types/ordersTypes'
import { api } from '@/lib/axios'

export async function getOrderDetails(id: string) {
  const response = await api.get<OrderDetails>(`/orders/${id}`)
  return response.data
}

export const GET_ORDER_DETAILS_KEY = 'order-details'
