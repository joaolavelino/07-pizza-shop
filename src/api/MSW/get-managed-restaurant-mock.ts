import { http, HttpResponse } from 'msw'
import type { getManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  getManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json(
    {
      id: 'mock-id-string',
      createdAt: new Date(),
      updatedAt: null,
      description: 'Mock description of a restaurant',
      managerId: 'mock-id-string',
      name: 'Mock Restaurant Name',
    },
    { status: 200 },
  )
})
