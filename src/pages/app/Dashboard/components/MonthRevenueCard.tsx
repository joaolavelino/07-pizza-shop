import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export interface MonthRevenueCardProps {}

export const MonthRevenueCard: React.FC<MonthRevenueCardProps> = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold">Total Revenue (Month)</CardTitle>
        <DollarSign size={20} className="text-rose-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">28403.03</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-500">+2%</span> over last month
        </p>
      </CardContent>
    </Card>
  )
}
