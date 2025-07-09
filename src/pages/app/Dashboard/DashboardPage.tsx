import { PageTitle } from '@/_util/pageTitle'
import { MonthRevenueCard } from './components/MonthRevenueCard'
import { MonthOrdersAmountCard } from './components/MonthOrdersAmount'
import { DayOrdersAmountCard } from './components/DayOrdersAmountCard'
import { MonthCanceledOrdersCardProps } from './components/MonthCanceledOrdersCardProps'
import { RevenueChart } from './components/RevenueChart'
import { PopularProductsChart } from './components/PopularProductsChart'

export const DashboardPage: React.FC = () => {
  return (
    <>
      <title>{PageTitle('My dashboard')}</title>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-thin tracking-tight">My Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <DayOrdersAmountCard />
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <MonthCanceledOrdersCardProps />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
