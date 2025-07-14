import { Check, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './OrderDetails'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import type { OrdersFromList } from '@/_types/ordersTypes'
import { formatCurrency, formatDateToNow } from '@/_util/format'
import { OrderStatus } from '@/components/OrderStatus'

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
              <Search />
              <span className="sr-only">Order Details</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDateToNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="hidden font-semibold lg:flex lg:items-center">
        <span>{order.customerName}</span>
      </TableCell>
      <TableCell className="font-semibold">
        {formatCurrency(order.total)}
      </TableCell>
      <TableCell className="font-semibold">
        <Button variant={'secondary'} size="sm">
          <Check className="text-green-600" />
          <span className="sr-only text-xs font-semibold lg:not-sr-only">
            Approve
          </span>
        </Button>
      </TableCell>
      <TableCell className="font-semibold">
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
