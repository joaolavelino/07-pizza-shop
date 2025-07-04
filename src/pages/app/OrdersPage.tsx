import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, Search, X } from 'lucide-react'

export const OrdersPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">Orders Page</h1>
      </div>
      <div className="space-y-2.5">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filters</span>
          <Input placeholder="Customer name" className="h-8 w-[320px]" />
        </form>
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
              <TableRow>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <Search />
                    <span className="sr-only">Order Details</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  1234556
                </TableCell>
                <TableCell className="text-muted-foreground">
                  5 minutes ago
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span className="text-muted-foreground font-medium">
                      Pending
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  Richard Henshall
                </TableCell>
                <TableCell className="font-semibold">€ 38,90</TableCell>
                <TableCell className="font-semibold">
                  <Button variant={'outline'} size="sm">
                    <Check />
                    <span className="sr-only text-xs font-semibold lg:not-sr-only">
                      Approve
                    </span>
                  </Button>
                </TableCell>
                <TableCell className="font-semibold">
                  <Button variant={'destructive'} size="sm">
                    <X />
                    <span className="sr-only text-xs font-semibold lg:not-sr-only">
                      Cancel
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
