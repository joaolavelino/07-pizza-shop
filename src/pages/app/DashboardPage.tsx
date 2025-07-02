import type { DefaultPageTypes } from '@/_types/pagesTypes'

export interface DashboardPageProps extends DefaultPageTypes {}

export const DashboardPage: React.FC<DashboardPageProps> = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <h1>Dashboard Page</h1>
    </>
  )
}
