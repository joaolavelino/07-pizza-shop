import { http, HttpResponse } from 'msw'
import type { DeliverOrderProps } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderProps>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      //simulate an error on passing this error id# - test UI outcomes
      return new HttpResponse(null, { status: 400 })
    }
    return new HttpResponse(null, { status: 200 })
  },
)
