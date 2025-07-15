import { CANCELABLE_STATUSES } from '@/_constants/constants'
import type { OrderStatus } from '@/_types/ordersTypes'
import { cancelOrder } from '@/api/cancel-order'
import { GET_ORDER_DETAILS_KEY } from '@/api/get-order-details'
import { GET_ORDERS_KEY } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UseCancelOrderProps {
  orderId: string
  orderStatus?: OrderStatus
}

export function useCancelOrder({ orderId, orderStatus }: UseCancelOrderProps) {
  const queryClient = useQueryClient()
  const {
    mutateAsync: cancelOrderFn,
    isPending: isCancelling,
    isSuccess: isCancelled,
  } = useMutation({
    mutationFn: () => cancelOrder({ orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORDERS_KEY] })
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_KEY, orderId],
      })
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
