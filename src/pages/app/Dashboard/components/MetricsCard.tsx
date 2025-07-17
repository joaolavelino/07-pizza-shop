import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { type LucideIcon } from 'lucide-react'

export interface MetricsCardProps {
  title: string
  cardIcon: LucideIcon
  infoPrimary: string | number | undefined
  infoSecondary: number | undefined
  isLoading: boolean
}
export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  infoPrimary,
  infoSecondary,
  isLoading,
  ...props
}) => {
  const comparisonColour =
    infoSecondary && infoSecondary > 0 ? 'text-emerald-500' : 'text-rose-600'

  const comparisonSufix = title.includes('month')
    ? 'over last month'
    : 'over yesterday'

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-semibold">{title}</CardTitle>
        <props.cardIcon size={20} className="text-rose-500" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-48" />
          </>
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {infoPrimary}
            </span>
            <p className="text-muted-foreground text-sm">
              <span className={comparisonColour}>{infoSecondary}%</span>{' '}
              {comparisonSufix}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
