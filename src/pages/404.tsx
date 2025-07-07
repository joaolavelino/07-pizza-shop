import { PageTitle } from '@/_util/pageTitle'
import { Button } from '@/components/ui/button'
import { Pizza } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface NotFoundPageProps {}

export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <>
      <title>{PageTitle('Page Not Found')}</title>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-6">
          <h1 className="text-foreground flex items-center gap-3 text-2xl font-thin">
            <Pizza strokeWidth={1} size={24} /> pizza.shop
          </h1>
        </div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <Button variant={'link'} asChild>
          <Link to={'/'}>Back to dashboard</Link>
        </Button>
      </div>
    </>
  )
}
