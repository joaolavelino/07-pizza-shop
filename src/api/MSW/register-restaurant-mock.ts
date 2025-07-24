import { http, HttpResponse } from 'msw'
import type { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json()
    if (restaurantName == 'test-restaurant') {
      return new HttpResponse(null, { status: 201 }) //201 == created
    }
    return new HttpResponse(null, { status: 400 }) //400 ==  Bad Request
  },
)
