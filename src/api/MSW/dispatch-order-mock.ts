import { http, HttpResponse } from 'msw'
import type { DispatchOrderProps } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderProps>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      //simulate an error on passing this error id# - test UI outcomes
      return new HttpResponse(null, { status: 400 })
    }
    return new HttpResponse(null, { status: 200 })
  },
)
