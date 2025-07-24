import { http, HttpResponse } from 'msw'
import type { CancelOrderProps } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderProps>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      //simulate an error on passing this error id# - test UI outcomes
      return new HttpResponse(null, { status: 400 })
    }
    return new HttpResponse(null, { status: 200 })
  },
)
