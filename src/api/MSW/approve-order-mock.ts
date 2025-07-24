import { http, HttpResponse } from 'msw'
import { type ApproveOrderProps } from '../approve-order'

export const approveOrderMock = http.patch<ApproveOrderProps>(
  '/orders/:orderId/approve',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      //simulate an error on passing this error id# - test UI outcomes
      return new HttpResponse(null, { status: 400 })
    }
    return new HttpResponse(null, { status: 200 })
  },
)
