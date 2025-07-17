import { formatCurrency } from '@/_util/format'
import colors from 'tailwindcss/colors'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  //   Tooltip,
} from 'recharts'

import { useMetrics } from '@/hooks/useMetrics'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { DatePickerRange } from '@/components/DatePickerRange'
import { ChartSpline } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

export interface RevenueChartProps {}

export const RevenueChart: React.FC<RevenueChartProps> = () => {
  const initialRange = {
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  }

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialRange,
  )
  const { dailyRevenue } = useMetrics({ dateRange: dateRange })

  function clearCalendar() {
    setDateRange(initialRange)
  }

  return (
    <Card className="lg:col-span-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <ChartSpline className="text-rose-500" size={32} />
        </div>
        <div className="space-y-1">
          <div className="flex w-full justify-between">
            <CardTitle className="text-2xl font-light">Daily Revenue</CardTitle>
          </div>
          <CardDescription>Daily revenue on the period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <DatePickerRange
          dateRange={dateRange}
          setDateRange={setDateRange}
          clearRange={clearCalendar}
        />
        {dailyRevenue ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart style={{ fontSize: 12 }} data={dailyRevenue}>
              <XAxis dataKey={'date'} />
              <YAxis
                tickFormatter={(receipt: number) => formatCurrency(receipt)}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type={'linear'}
                strokeWidth={3}
                dataKey={'receipt'}
                stroke={colors.rose[400]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>
            <Skeleton className="h-[300px] w-full" />
          </>
        )}
      </CardContent>
    </Card>
  )
}
