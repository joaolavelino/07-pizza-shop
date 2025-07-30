import type { OrderDetails } from '@/_types/ordersTypes'
import { http, HttpResponse } from 'msw'
import type { GetOrderDetailsParams } from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  OrderDetails
>(`/orders/:orderId`, ({ params }) => {
  return HttpResponse.json({
    createdAt: new Date(),
    id: params.orderId,
    customer: {
      email: 'mock@mock.com',
      name: 'Mock Customer Name',
      phone: '1234567890',
    },
    orderItems: [
      {
        id: 'item-id-1',
        priceInCents: 999,
        product: { name: 'Pizza Napoletana' },
        quantity: 2,
      },
      {
        id: 'item-id-2',
        priceInCents: 899,
        product: { name: 'Pizza Margherita' },
        quantity: 1,
      },
    ],
    status: 'pending',
    totalInCents: 2 * 999 + 899,
  })
})
