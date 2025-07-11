import { Pagination } from '@/components/Pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderTableFilter } from './components/OrderTableFilter'
import { OrderTableRow } from './components/OrderTableRow'
import { useQuery } from '@tanstack/react-query'
import { GET_ORDERS_KEY, getOrders } from '@/api/get-orders'
import { Skeleton } from '@/components/ui/skeleton'

export const OrdersPage: React.FC = () => {
  const { data: result } = useQuery({
    queryKey: [GET_ORDERS_KEY],
    queryFn: getOrders,
  })

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">Orders Page</h1>

        <div className="space-y-2.5">
          <OrderTableFilter />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-25">Id#</TableHead>
                <TableHead className="w-30">Ordered at</TableHead>
                <TableHead className="w-15 md:w-30">Status</TableHead>
                <TableHead className="hidden lg:flex">Customer</TableHead>
                <TableHead className="w-30">Order Total</TableHead>
                <TableHead className="w-12 lg:w-25"></TableHead>
                <TableHead className="w-12 lg:w-25"></TableHead>
              </TableHeader>
              <TableBody>
                {result
                  ? result.orders.map((order) => (
                      <OrderTableRow key={order.orderId} order={order} />
                    ))
                  : Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i} className="flex w-full">
                        <TableCell>
                          <Skeleton className="h-4 w-12"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-25"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-30"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-15 md:w-30"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="hidden h-4 w-full lg:flex"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-30"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12 lg:w-25"></Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12 lg:w-25"></Skeleton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <Pagination
              entriesNumber={result?.meta.totalCount || 0}
              perPage={result?.meta.perPage || 10}
              pageIndex={result?.meta.pageIndex || 0}
            />
          </div>
        </div>
      </div>
    </>
  )
}
