import { CANCELABLE_STATUSES } from '@/_constants/constants'
import type {
  OrderDetails,
  OrdersFromList,
  OrderStatus,
} from '@/_types/ordersTypes'
import { cancelOrder } from '@/api/cancel-order'
import { GET_ORDER_DETAILS_KEY } from '@/api/get-order-details'
import { GET_ORDERS_KEY, type GetOrdersResponse } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
interface UseCancelOrderProps {
  orderId: string
  orderStatus?: OrderStatus
  callbackFn?: () => void
}

export function useCancelOrder({
  orderId,
  orderStatus,
  callbackFn,
}: UseCancelOrderProps) {
  const queryClient = useQueryClient()
  const {
    mutateAsync: cancelOrderFn,
    isPending: isCancelling,
    isSuccess: isCancelled,
  } = useMutation({
    mutationFn: () => cancelOrder({ orderId }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [GET_ORDERS_KEY] })
      // queryClient.invalidateQueries({
      //   queryKey: [GET_ORDER_DETAILS_KEY, orderId],
      // })

      //cancel manually to avoid refetch - change pagination
      //OrderList
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: [GET_ORDERS_KEY],
      })

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order: OrdersFromList) => {
            if (order.orderId == orderId) {
              return { ...order, status: 'canceled' }
            }
            return order
          }),
        })
      })
      //OrderDetails
      queryClient.setQueryData(
        [GET_ORDER_DETAILS_KEY, orderId],
        (cachedData: OrderDetails) => {
          if (!cachedData) return
          return {
            ...cachedData,
            status: 'canceled',
          }
        },
      )

      if (callbackFn) callbackFn()

      toast.success(`The order ${orderId} was cancelled`)
    },
    onError: (error) => {
      toast.error(`Error on cancelling the order ${orderId}`, {
        description: error.message,
      })
    },
  })

  const isCancelDisabled =
    !orderStatus || !CANCELABLE_STATUSES.includes(orderStatus)

  return { cancelOrderFn, isCancelDisabled, isCancelling, isCancelled }
}
