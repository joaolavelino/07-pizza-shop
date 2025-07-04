import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideCalendarCheck } from 'lucide-react'

export interface DayOrdersAmountCardProps {}
export const DayOrdersAmountCard: React.FC<DayOrdersAmountCardProps> = () => {
  return (
    <Card className="border-rose-200 dark:border-rose-800">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold">Today's Orders</CardTitle>
        <LucideCalendarCheck size={20} className="text-rose-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">7</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-rose-500">-1,7%</span> over last month
        </p>
      </CardContent>
    </Card>
  )
}
