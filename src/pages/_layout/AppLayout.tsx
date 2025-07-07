import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Outlet } from 'react-router-dom'

export interface AppLayoutProps {}

export const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground flex w-screen flex-col items-center text-sm">
        <p>Created during the React learning path from Rocketseat. </p>
        <Button variant={'link'}>
          <a
            href="https://github.com/joaolavelino/06-ingite-github-blog/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check here all the learning notes on Github
          </a>
        </Button>
      </footer>
    </div>
  )
}
