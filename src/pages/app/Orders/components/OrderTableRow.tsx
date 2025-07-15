import type { OrdersFromList } from '@/_types/ordersTypes'
import { formatCurrency, formatDateToNow } from '@/_util/format'
import { OrderStatus } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Check, MoreHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { OrderDetailsModal } from './OrderDetails'
import { CANCELABLE_STATUSES } from '@/_constants/constants'
import { OrderCancelConfirmation } from './OrderCancelConfirmation'

export interface OrderTableRowProps {
  order: OrdersFromList
}

export const OrderTableRow: React.FC<OrderTableRowProps> = ({ order }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false)

  function closeConfirmation() {
    window.alert('close Modal')
    setIsCancelConfirmationOpen(false)
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger>
            <Button variant="outline" size="icon">
              <MoreHorizontal />
              <span className="sr-only">Order Details</span>
            </Button>
          </DialogTrigger>
          <OrderDetailsModal open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="hidden font-mono text-xs font-medium lg:table-cell">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDateToNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-semibold">
        <span>{order.customerName}</span>
      </TableCell>
      <TableCell className="font-semibold">
        {formatCurrency(order.total / 100)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Button
          variant={'secondary'}
          size="sm"
          disabled={order.status == 'canceled'}
        >
          <Check className="text-green-600" />
          <span className="sr-only text-xs font-semibold lg:not-sr-only">
            Approve
          </span>
        </Button>
      </TableCell>
      <TableCell className="hidden font-semibold md:table-cell">
        <Dialog
          open={isCancelConfirmationOpen}
          onOpenChange={setIsCancelConfirmationOpen}
        >
          <DialogTrigger asChild>
            <Button
              disabled={!CANCELABLE_STATUSES.includes(order.status)}
              variant={'outline'}
              size="sm"
              className=""
            >
              <X className="text-rose-500" />
              <span className="sr-only text-xs font-semibold lg:not-sr-only">
                Cancel
              </span>
            </Button>
          </DialogTrigger>
          <OrderCancelConfirmation
            orderId={order.orderId}
            closeFn={closeConfirmation}
            shouldCloseOnSuccess
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
