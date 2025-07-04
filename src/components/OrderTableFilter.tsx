import { Filter, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export interface OrderTableFilterProps {}

export const OrderTableFilter: React.FC<OrderTableFilterProps> = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <span className="text-2xl font-light">Filters</span>
      <form className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
        <Input placeholder="Order Id#" className="md:w-[180px]" />
        <Input placeholder="Customer name" className="flex-1" />

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="flex-1 md:w-[140px]">
              <SelectValue className="" defaultValue={'all'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">canceled</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" variant={'secondary'}>
            <Filter />
            <span className="sr-only lg:not-sr-only">Filter results</span>
          </Button>
          <Button type="button" variant={'outline'}>
            <X />
            <span className="sr-only lg:not-sr-only">Reset filters</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
