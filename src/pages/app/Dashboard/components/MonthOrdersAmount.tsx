import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartSpline } from 'lucide-react'

export interface MonthOrdersAmountCardProps {}
export const MonthOrdersAmountCard: React.FC<
  MonthOrdersAmountCardProps
> = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold">Total Orders (month)</CardTitle>
        <ChartSpline size={20} className="text-rose-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">250</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-500">+1,7%</span> over last month
        </p>
      </CardContent>
    </Card>
  )
}
