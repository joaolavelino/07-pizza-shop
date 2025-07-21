import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Filter, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'

export interface OrderTableFilterProps {}

export const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersDataType = z.infer<typeof orderFiltersSchema>

export const OrderTableFilter: React.FC<OrderTableFilterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  //Check if there's already searchParams on the url - they will be set on the form's default values
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersDataType>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        customerName: customerName || '',
        orderId: orderId || '',
        status: status || 'all',
      },
    })

  function handleFilter(data: OrderFiltersDataType) {
    const { customerName, orderId, status } = data
    setSearchParams((state) => {
      // if there's orderId on the data: it`ll update the search param, or else, it will remove the respective search param
      if (orderId) {
        state.set('orderId', orderId)
      } else state.delete('orderId')
      //do this to the other filters
      if (customerName) {
        state.set('customerName', customerName)
      } else state.delete('customerName')
      if (status && status !== 'all') {
        state.set('status', status)
      } else state.delete('status')

      //return to page 1
      state.set('page', '1')

      return state
    })
  }

  function handleResetFilter() {
    setSearchParams((state) => {
      state.delete('status')
      state.delete('customerName')
      state.delete('orderId')
      state.set('page', '1')
      reset()
      return state
    })
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <span className="text-2xl font-light">Filters</span>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex flex-1 flex-col gap-2 md:flex-row md:items-center"
      >
        <Input
          {...register('orderId')}
          placeholder="Order Id#"
          className="md:w-[180px]"
          aria-label="Order Id"
        />
        <Input
          {...register('customerName')}
          placeholder="Customer name"
          className="flex-1"
          aria-label="Customer Name"
        />

        <div className="flex gap-2">
          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                defaultValue="all"
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
                aria-label="Order Status"
              >
                <SelectTrigger className="flex-1 md:w-[140px]">
                  <SelectValue className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivering">Delivering</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Button type="submit" variant={'secondary'} aria-label="">
            <Filter />
            <span className="sr-only lg:not-sr-only">Filter results</span>
          </Button>
          <Button type="button" variant={'outline'} onClick={handleResetFilter}>
            <X />
            <span className="sr-only lg:not-sr-only">Reset filters</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
