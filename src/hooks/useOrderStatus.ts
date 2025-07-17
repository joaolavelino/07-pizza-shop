import { CANCELABLE_STATUSES } from '@/_constants/constants'
import type {
  OrderDetails,
  OrdersFromList,
  OrderStatus,
} from '@/_types/ordersTypes'
import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GET_ORDER_DETAILS_KEY } from '@/api/get-order-details'
import { GET_ORDERS_KEY, type GetOrdersResponse } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, ShoppingBag, Truck } from 'lucide-react'
import { toast } from 'sonner'
interface UseOrderStatusProps {
  orderId: string
  orderStatus?: OrderStatus
  callbackFn?: () => void
}

export function useOrderStatus({
  orderId,
  orderStatus,
  callbackFn,
}: UseOrderStatusProps) {
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(newStatus: OrderStatus) {
    // THIS WAS THE QUERY INVALIDATION FUNCTION - LEFT HERE FOR FUTURE REFERENCE
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
            return { ...order, status: newStatus }
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
          status: newStatus,
        }
      },
    )
  }

  const {
    mutateAsync: cancelOrderFn,
    isPending: isCancelling,
    isSuccess: isCancelled,
  } = useMutation({
    mutationFn: () => cancelOrder({ orderId }),
    onSuccess: () => {
      updateOrderStatusOnCache('canceled')

      if (callbackFn) callbackFn()

      toast.success(`The order ${orderId} was cancelled`)
    },
    onError: (error) => {
      toast.error(`Error on cancelling the order ${orderId}`, {
        description: error.message,
      })
    },
  })

  const { mutateAsync: approveOrderfn, isPending: isApproving } = useMutation({
    mutationFn: () => approveOrder({ orderId }),
    onSuccess: () => {
      updateOrderStatusOnCache('processing')

      toast.success(`The order ${orderId} was approved`)
    },
    onError: (error) => {
      toast.error(`Error on approving the order ${orderId}`, {
        description: error.message,
      })
    },
  })

  const { mutateAsync: dispatchOrderfn, isPending: isDispatching } =
    useMutation({
      mutationFn: () => dispatchOrder({ orderId }),
      onSuccess: () => {
        updateOrderStatusOnCache('delivering')

        toast.success(`The order ${orderId} was dispatched`)
      },
      onError: (error) => {
        toast.error(`Error on dispatching the order ${orderId}`, {
          description: error.message,
        })
      },
    })
  const { mutateAsync: deliverOrderfn, isPending: isDelivering } = useMutation({
    mutationFn: () => deliverOrder({ orderId }),
    onSuccess: () => {
      updateOrderStatusOnCache('delivered')

      toast.success(`The order ${orderId} was delivered`)
    },
    onError: (error) => {
      toast.error(`Error on delivering the order ${orderId}`, {
        description: error.message,
      })
    },
  })

  const statusOptionsSwitch = () => {
    switch (orderStatus) {
      case 'pending':
        return {
          buttonText: 'Approve',
          handleStatusChange: approveOrderfn,
          icon: Check,
        }
      case 'processing':
        return {
          buttonText: 'Dispatch',
          handleStatusChange: dispatchOrderfn,
          icon: Truck,
        }
      case 'delivering':
        return {
          buttonText: 'Deliver',
          handleStatusChange: deliverOrderfn,
          icon: ShoppingBag,
        }
      default:
        break
    }
  }

  const statusChangeOptions = statusOptionsSwitch()

  const isCancelDisabled =
    !orderStatus || !CANCELABLE_STATUSES.includes(orderStatus)

  return {
    cancelOrderFn,
    statusChangeOptions,
    isCancelDisabled,
    isCancelling,
    isCancelled,
    isApproving,
    isDispatching,
    isDelivering,
  }
}
