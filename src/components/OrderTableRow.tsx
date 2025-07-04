import { Check, Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

export interface OrderTableRowProps {}

export const OrderTableRow: React.FC<OrderTableRowProps> = () => {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="icon">
          <Search />
          <span className="sr-only">Order Details</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">1234556</TableCell>
      <TableCell className="text-muted-foreground">5 minutes ago</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="text-muted-foreground font-medium">Pending</span>
        </div>
      </TableCell>
      <TableCell className="font-semibold">Richard Henshall</TableCell>
      <TableCell className="font-semibold">€ 38,90</TableCell>
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
