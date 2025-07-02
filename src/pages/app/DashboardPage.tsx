import type { DefaultPageProps } from '@/_types/pagesTypes'

export interface DashboardPageProps extends DefaultPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <h1>Dashboard Page</h1>
    </>
  )
}
