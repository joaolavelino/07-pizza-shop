import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { GET_ORDER_DETAILS_KEY, getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/OrderStatus'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency, formatDateToNow } from '@/_util/format'

export interface OrderDetailsProps {
  orderId: string
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { data: orderDetails } = useQuery({
    queryKey: [GET_ORDER_DETAILS_KEY, orderId],
    queryFn: () => getOrderDetails(orderId),
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center gap-4">
            Order Id#:{' '}
            {orderDetails ? (
              <span>{orderDetails.id}</span>
            ) : (
              <Skeleton className="h-8 w-48" />
            )}
          </div>
        </DialogTitle>
      </DialogHeader>

      {!orderDetails ? (
        <OrderDetailsSkeleton />
      ) : (
        <>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={orderDetails?.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Customer
                </TableCell>
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
                <TableCell className="text-muted-foreground">
                  Time ago
                </TableCell>
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
        </>
      )}
    </DialogContent>
  )
}

const OrderDetailsSkeleton = () => {
  return (
    <>
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
    </>
  )
}
