import { http, HttpResponse } from 'msw'
import type { GetOrdersResponse } from '../get-orders'
import type { OrdersFromList, OrderStatus } from '@/_types/ordersTypes'

export const statusArray: OrderStatus[] = [
  'canceled',
  'delivered',
  'delivering',
  'pending',
  'processing',
]

const orderList: OrdersFromList[] = Array.from({ length: 63 }).map(
  (_, index) => {
    return {
      total: 1883,
      createdAt: new Date(),
      orderId: `mock-order-id-${index + 1}`,
      customerName: `Mock Customer Name - ${index + 1}`,
      status: statusArray[index % statusArray.length],
    }
  },
)

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url) //this class URL get the url string and transforms it into a inspectable object
    const pageIndex = searchParams.get('pageIndex') //here I get the params from that
      ? Number(searchParams.get('pageIndex'))
      : 0
    const customerNameQuery = searchParams.get('customerName')
    const orderIdQuery = searchParams.get('orderId')
    const statusQuery = searchParams.get('status')

    let filteredOrders = orderList

    if (customerNameQuery) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerNameQuery),
      )
    }
    if (orderIdQuery) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderIdQuery),
      )
    }
    if (statusQuery) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status == statusQuery,
      )
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: { pageIndex, perPage: 10, totalCount: filteredOrders.length },
    })
  },
)
