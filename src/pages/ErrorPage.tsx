import { PageTitle } from '@/_util/pageTitle'
import { Button } from '@/components/ui/button'
import { Pizza } from 'lucide-react'
import { Link, useRouteError } from 'react-router-dom'

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error

  return (
    <>
      <title>{PageTitle('Oops! Error')}</title>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-6">
          <h1 className="text-foreground flex items-center gap-3 text-2xl font-thin">
            <Pizza strokeWidth={1} size={24} /> pizza.shop
          </h1>
        </div>
        <h1 className="text-4xl font-bold">Ooops! Something went wrong!</h1>
        <p>
          An error occurred on the application. Please check the details below
          or try again later.
        </p>
        <pre>{error?.message || JSON.stringify(error)}</pre>
        <Button variant={'link'} asChild>
          <Link to={'/'}>Back to dashboard</Link>
        </Button>
      </div>
    </>
  )
}
