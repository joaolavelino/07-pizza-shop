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

export interface OrderDetailsProps {}

export const OrderDetails: React.FC<OrderDetailsProps> = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order Id#: 1234556</DialogTitle>
      </DialogHeader>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                <span className="text-muted-foreground font-medium">
                  Pending
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Customer</TableCell>
            <TableCell className="flex justify-end">Richard Henshall</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Phone</TableCell>
            <TableCell className="flex justify-end">99-99999-9999</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Email</TableCell>
            <TableCell className="flex justify-end">
              richard-henshall@haken.com
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Time ago</TableCell>
            <TableCell className="flex justify-end">15 minutes ago</TableCell>
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
          <TableRow>
            <TableCell className="">Large - Napoletana</TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">€ 28,90</TableCell>
            <TableCell className="text-right">€ 28,90</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Large - Pepperoni</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">€ 32,90</TableCell>
            <TableCell className="text-right">€ 65,80</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="border-t-2 font-semibold">
            <TableCell className="" colSpan={3}>
              Total
            </TableCell>
            <TableCell className="text-right">€ 94,70</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DialogContent>
  )
}
