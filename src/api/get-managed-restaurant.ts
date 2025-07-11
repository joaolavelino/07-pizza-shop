import { api } from '@/lib/axios'

export interface getManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<getManagedRestaurantResponse>(
    '/managed-restaurant',
  )
  return response.data
}

export const MANAGED_RESTAURANT_KEY = 'managed-restaurants' as const
