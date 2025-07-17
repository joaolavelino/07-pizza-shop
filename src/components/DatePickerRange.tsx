import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useState } from 'react'

import { Calendar1Icon, CalendarX, ChevronDownIcon } from 'lucide-react'
import { formatDate } from '@/_util/format'
import type { DateRange } from 'react-day-picker'

export interface DatePickerRangeProps {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  clearRange: () => void
}

export const DatePickerRange: React.FC<DatePickerRangeProps> = ({
  dateRange,
  setDateRange,
  clearRange,
}) => {
  const [open, setOpen] = useState(false)
  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to }) // Esse é o seu tipo interno
    } else {
      setDateRange(undefined)
    }
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Select a date"
          variant="outline"
          id="date"
          className="mb-8 w-72 justify-between font-normal"
        >
          <Calendar1Icon className="text-rose-500" />
          {dateRange
            ? `${dateRange.from ? formatDate(dateRange.from) : ''} - ${dateRange.to ? formatDate(dateRange.to) : ''} `
            : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <Button
        variant={'ghost'}
        className="ml-4"
        onClick={clearRange}
        size="icon"
      >
        <CalendarX className="text-rose-500" />
      </Button>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          max={7}
          selected={dateRange}
          captionLayout="dropdown"
          onSelect={(range: DateRange | undefined) => handleSelect(range)}
        />
      </PopoverContent>
    </Popover>
  )
}
