import { http, HttpResponse } from 'msw'
import type { getProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, getProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json(
      {
        id: 'mock-id-string',
        name: 'Mock Name',
        email: 'mock@mail.com',
        phone: '1234567890',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: null,
      },
      { status: 200 },
    )
  },
)
