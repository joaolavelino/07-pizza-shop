import { OrderTableFilter } from '@/components/OrderTableFilter'
import { OrderTableRow } from '@/components/OrderTableRow'
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table'

export const OrdersPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">Orders Page</h1>
      </div>
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
              <OrderTableRow />
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
