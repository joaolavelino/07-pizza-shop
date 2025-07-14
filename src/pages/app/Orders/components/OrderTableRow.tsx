import type { OrdersFromList } from '@/_types/ordersTypes'
import { formatCurrency, formatDateToNow } from '@/_util/format'
import { OrderStatus } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Check, MoreHorizontal, X } from 'lucide-react'
import { OrderDetails } from './OrderDetails'

export interface OrderTableRowProps {
  order: OrdersFromList
}

export const OrderTableRow: React.FC<OrderTableRowProps> = ({ order }) => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" size="icon">
              <MoreHorizontal />
              <span className="sr-only">Order Details</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} />
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
        {formatCurrency(order.total)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Button variant={'secondary'} size="sm">
          <Check className="text-green-600" />
          <span className="sr-only text-xs font-semibold lg:not-sr-only">
            Approve
          </span>
        </Button>
      </TableCell>
      <TableCell className="hidden font-semibold md:table-cell">
        <Button variant={'outline'} size="sm" className="">
          <X className="text-rose-500" />
          <span className="sr-only text-xs font-semibold lg:not-sr-only">
            Cancel
          </span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
