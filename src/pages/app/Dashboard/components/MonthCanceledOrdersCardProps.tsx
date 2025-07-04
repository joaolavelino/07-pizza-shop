import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleOff } from 'lucide-react'

export interface MonthCanceledOrdersCardProps {}

export const MonthCanceledOrdersCardProps: React.FC<
  MonthCanceledOrdersCardProps
> = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold">Canceled Orders (month)</CardTitle>
        <CircleOff size={20} className="text-rose-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">1</span>
        <p className="text-muted-foreground text-sm">
          <span className="text-emerald-500">-50%</span> over last month
        </p>
      </CardContent>
    </Card>
  )
}
