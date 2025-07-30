import { CANCELABLE_STATUSES } from '@/_constants/constants'
import type { OrderDetails } from '@/_types/ordersTypes'
import { formatCurrency, formatDateToNow } from '@/_util/format'
import { GET_ORDER_DETAILS_KEY, getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrderStatus } from '@/hooks/useOrderStatus'
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { LoaderCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OrderCancelConfirmation } from './OrderCancelConfirmation'

export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export const OrderDetailsModal: React.FC<OrderDetailsProps> = ({
  orderId,
  open,
}) => {
  const { data: orderDetails } = useQuery({
    queryKey: [GET_ORDER_DETAILS_KEY, orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (open) {
      setIsCancelling(false)
    }
  }, [open])

  return (
    <>
      {orderDetails ? (
        <>
          {isCancelling ? (
            <OrderCancelConfirmation
              closeFn={() => setIsCancelling(false)}
              orderId={orderId}
              shouldCloseOnSuccess={false}
            />
          ) : (
            <OrderInformation
              openCancelling={() => setIsCancelling(true)}
              orderDetails={orderDetails}
            />
          )}
        </>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </>
  )
}

const OrderDetailsSkeleton = () => {
  return (
    <DialogContent>
      <DialogTitle className="sr-only">Order Details</DialogTitle>
      <DialogDescription className="sr-only">
        Loading Information
      </DialogDescription>
      <div className="my-4 space-y-4">
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 flex-1" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-6 flex-1" />
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-6 w-18" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-4 w-18" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-4 w-18" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-4 w-18" />
        </div>
        <div className="flex h-6 w-full items-center gap-2">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-18" />
        </div>
      </div>
    </DialogContent>
  )
}

interface OrderInformationProps {
  orderDetails: OrderDetails
  openCancelling: () => void
}

const OrderInformation: React.FC<OrderInformationProps> = ({
  orderDetails,
  openCancelling,
}) => {
  const {
    statusChangeOptions,
    isApproving,
    isDelivering,
    isDispatching,
    isCancelling,
  } = useOrderStatus({
    orderId: orderDetails.id,
    orderStatus: orderDetails.status,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center gap-4">
            Order Id#: <span>{orderDetails.id}</span>
          </div>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Information about the order
        </DialogDescription>
      </DialogHeader>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <OrderStatus status={orderDetails?.status} full />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Customer</TableCell>
            <TableCell className="flex justify-end">
              {orderDetails.customer.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Phone</TableCell>
            <TableCell className="flex justify-end">
              {orderDetails.customer.phone || (
                <span className="text-muted-foreground">Not informed</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Email</TableCell>
            <TableCell className="flex justify-end">
              {orderDetails.customer.email}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Time ago</TableCell>
            <TableCell className="flex justify-end">
              {formatDateToNow(orderDetails.createdAt)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className=""></TableHead>
            <TableHead className="w-10 text-right">Qty.</TableHead>
            <TableHead className="w-20 text-right">Price</TableHead>
            <TableHead className="w-20 text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails?.orderItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="">{item.product.name}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.priceInCents / 100)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency((item.priceInCents / 100) * item.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 font-semibold">
            <TableCell className="" colSpan={3}>
              Total
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(orderDetails?.totalInCents / 100)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="w-fill mt-4 flex gap-2">
        {statusChangeOptions && (
          <Button
            variant="suceess"
            size={'lg'}
            className="flex-1"
            disabled={orderDetails.status == 'canceled'}
            onClick={() => statusChangeOptions.handleStatusChange()}
          >
            {isApproving || isDelivering || isDispatching ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <statusChangeOptions.icon />
                <span className="text-xs font-semibold">
                  {statusChangeOptions.buttonText}
                </span>
              </>
            )}
          </Button>
        )}

        <DialogClose asChild>
          <Button variant="secondary" size={'lg'} className="flex-1">
            <X />
            <span className="text-xs font-semibold">Close</span>
          </Button>
        </DialogClose>

        {orderDetails.status !== 'delivered' && (
          <Button
            onClick={openCancelling}
            disabled={!CANCELABLE_STATUSES.includes(orderDetails.status)}
            variant="destructive"
            size={'lg'}
            className="flex-1"
          >
            {!isCancelling ? (
              <>
                <X />
                <span className="text-xs font-semibold">Cancel Order</span>
              </>
            ) : (
              <LoaderCircle className="animate-spin" />
            )}
          </Button>
        )}
      </div>
    </DialogContent>
  )
}
