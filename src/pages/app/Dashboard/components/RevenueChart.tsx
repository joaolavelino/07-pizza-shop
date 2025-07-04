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
import { ChartSpline } from 'lucide-react'

export interface RevenueChartProps {}

const data = [
  { date: '06/01', value: 1428 },
  { date: '06/02', value: 1875 },
  { date: '06/03', value: 1982 },
  { date: '06/04', value: 1725 },
  { date: '06/05', value: 895 },
  { date: '06/06', value: 1025 },
  { date: '06/07', value: 1128 },
  { date: '06/08', value: 1325 },
  { date: '06/09', value: 1850 },
  { date: '06/10', value: 1965 },
  { date: '06/11', value: 1542 },
  { date: '06/12', value: 876 },
  { date: '06/13', value: 942 },
  { date: '06/14', value: 1285 },
  { date: '06/15', value: 1350 },
  { date: '06/16', value: 1825 },
  { date: '06/17', value: 1942 },
  { date: '06/18', value: 1625 },
  { date: '06/19', value: 825 },
  { date: '06/20', value: 1050 },
  { date: '06/21', value: 1175 },
  { date: '06/22', value: 1425 },
  { date: '06/23', value: 1765 },
  { date: '06/24', value: 1925 },
  { date: '06/25', value: 1325 },
  { date: '06/26', value: 875 },
  { date: '06/27', value: 925 },
  { date: '06/28', value: 1185 },
  { date: '06/29', value: 1475 },
  { date: '06/30', value: 1825 },
]

export const RevenueChart: React.FC<RevenueChartProps> = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center gap-4 pb-8">
        <div>
          <ChartSpline className="text-rose-500" size={32} />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-light">Daily Revenue</CardTitle>
          <CardDescription>Daily revenue on the period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <XAxis dataKey={'date'} />
            <YAxis tickFormatter={(value: number) => formatCurrency(value)} />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type={'linear'}
              strokeWidth={3}
              dataKey={'value'}
              stroke={colors.rose[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
