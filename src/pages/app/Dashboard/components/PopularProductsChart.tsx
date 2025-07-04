import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Star } from 'lucide-react'

export interface PopularProductsChartProps {}

export const data = [
  { name: 'Pepperoni', orders: 142 },
  { name: 'Napoletana', orders: 128 },
  { name: 'BBQ Chicken', orders: 98 },
  { name: 'Hawaiian', orders: 85 },
  { name: 'Margherita', orders: 76 },
  { name: 'Mushroom Truffle', orders: 64 },
  { name: 'Four Cheese', orders: 59 },
  { name: 'Diavola', orders: 53 },
  { name: 'Capricciosa', orders: 47 },
  { name: 'White Pizza', orders: 39 },
]

export const PopularProductsChart: React.FC<PopularProductsChartProps> = () => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div>
          <Star className="text-rose-500" size={32} />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-light">
            Popular Products
          </CardTitle>
          <CardDescription>Most ordered products last month</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {/* <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="orders"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={64}
              outerRadius={80}
              strokeWidth={1}
            >
              {data.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={COLORS[i]}
                  className="hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl font-black">Product</TableHead>
              <TableHead className="text-right text-xl font-black">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                key={`popular-line-${i}`}
                className={`${i == 0 ? 'text-rose-500' : 'text-foreground'}`}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.orders}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
