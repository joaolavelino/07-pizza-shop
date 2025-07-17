import { GET_ORDERS_KEY, getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'
import { OrderTableFilter } from './components/OrderTableFilter'
import { OrderTableRow } from './components/OrderTableRow'

export const OrdersPage: React.FC = () => {
  const [searchParams, setSearhParams] = useSearchParams()

  const pageIndex = z.coerce
    .number() //transform it to a number
    .transform((page) => page - 1) //subtract 1 from it (page=1 on the URL will become pageIndex=0)
    .parse(searchParams.get('page') ?? 1) //choose the param, if absent, it's 1

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: result } = useQuery({
    queryKey: [GET_ORDERS_KEY, pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex: pageIndex,
        orderId,
        customerName,
        status: status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    const newPage = pageIndex + 1 //on the url and paginantion we are using the first page as 1, instead of zero
    setSearhParams((state) => {
      state.set('page', newPage.toString())
      return state
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">Orders Page</h1>

        <div className="space-y-2.5">
          <OrderTableFilter />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="hidden w-40 lg:table-cell">
                    Id#
                  </TableHead>
                  <TableHead className="w-30">Ordered at</TableHead>
                  <TableHead className="w-15 md:w-30">Status</TableHead>
                  <TableHead className="">Customer</TableHead>
                  <TableHead className="w-30">Order Total</TableHead>
                  <TableHead className="hidden w-12 md:table-cell lg:w-25"></TableHead>
                  <TableHead className="hidden w-12 md:table-cell lg:w-25"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result
                  ? result.orders.map((order) => (
                      <OrderTableRow key={order.orderId} order={order} />
                    ))
                  : Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i} className="">
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                        <TableCell className="font-mono text-xs font-medium">
                          <Skeleton className="h-4" />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <Skeleton className="h-4" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4" />
                        </TableCell>
                        <TableCell className="hidden font-semibold md:flex">
                          <Skeleton className="h-4" />
                        </TableCell>
                        <TableCell className="font-semibold">
                          <Skeleton className="h-4" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-8" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-8" />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            {result && (
              <Pagination
                onPageChange={handlePaginate}
                entriesNumber={result?.meta.totalCount || 0}
                perPage={result?.meta.perPage || 10}
                pageIndex={pageIndex}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
