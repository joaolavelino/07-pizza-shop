import { PageTitle } from '@/_util/pageTitle'
import { useMetrics } from '@/hooks/useMetrics'
import { MetricsCard } from './components/MetricsCard'
import { PopularProductsChart } from './components/PopularProductsChart'
import { RevenueChart } from './components/RevenueChart'

export const DashboardPage: React.FC = () => {
  const { metricsData, popularProductsList } = useMetrics()
  return (
    <>
      <title>{PageTitle('My dashboard')}</title>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">My Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Object.entries(metricsData).map((entry) => {
            const data = entry[1]

            return (
              <MetricsCard
                key={data.title}
                cardIcon={data.icon}
                infoPrimary={data.infoPrimary}
                infoSecondary={data.infoSecondary}
                isLoading={data.isLoading}
                title={data.title}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
          <RevenueChart />
          <PopularProductsChart data={popularProductsList} />
        </div>
      </div>
    </>
  )
}
