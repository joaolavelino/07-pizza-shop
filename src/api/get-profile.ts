import { api } from '@/lib/axios'

export interface getProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')
  return response.data
}

export const GET_PROFILE_KEY = 'user-profile' as const
