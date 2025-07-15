export type OrdersFromList = {
  orderId: string
  createdAt: Date
  status: OrderStatus
  customerName: string
  total: number
}

export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export type OrderDetails = {
  id: string
  createdAt: Date
  status: OrderStatus
  totalInCents: number
  customer: {
    name: string
    phone: string | null
    email: string
  }
  orderItems: OrderItem[]
}

export type OrderItem = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}
