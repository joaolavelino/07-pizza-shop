import { Pagination } from '@/components/Pagination'
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table'
import { OrderTableFilter } from './components/OrderTableFilter'
import { OrderTableRow } from './components/OrderTableRow'

export const OrdersPage: React.FC = () => {
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
                <TableHead className="w-30">Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="w-30">Order Total</TableHead>
                <TableHead className="w-12 lg:w-25"></TableHead>
                <TableHead className="w-12 lg:w-25"></TableHead>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <OrderTableRow key={i} />
                ))}
              </TableBody>
            </Table>
            <Pagination entriesNumber={45} perPage={5} pageIndex={1} />
          </div>
        </div>
      </div>
    </>
  )
}
