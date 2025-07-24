import { http, HttpResponse } from 'msw'
import type { UpdateRestaurantProfileBody } from '../update-restaurant-profile'

export const updateRestaurantProfileMock = http.put<
  never,
  UpdateRestaurantProfileBody
>('/profile', async ({ request }) => {
  const { name } = await request.json()
  if (name == 'New Name') {
    return new HttpResponse(null, { status: 200 })
  }
  return new HttpResponse(null, { status: 400 })
})
