import { Button } from '@/components/ui/button'
import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export interface AuthLayoutProps {}

export const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="border-r-2-foreground text-muted-foreground flex h-full flex-col justify-between bg-[url(pizza-dark.jpg)] bg-cover bg-center">
        <h1 className="text-foreground flex items-center gap-3 p-8 text-4xl font-thin">
          <Pizza strokeWidth={1} size={40} /> pizza.shop
        </h1>
        <div className="flex h-full flex-col lg:hidden">
          <main className="flex flex-1 flex-col items-center justify-center">
            <Outlet />
          </main>
          <footer></footer>
        </div>
        <footer className="p-8 text-sm">
          <p>
            Painel do Parceiro &copy; pizza.shop - {new Date().getFullYear()}
          </p>
          <p>Created during the React learning path from Rocketseat. </p>
          <Button asChild variant="secondary">
            <a
              className="mt-2 italic"
              href="https://github.com/joaolavelino/06-ingite-github-blog/issues"
            >
              Check here all the learning notes on Github
            </a>
          </Button>
        </footer>
      </div>
      <div className="hidden h-full flex-col lg:flex">
        <main className="flex flex-1 flex-col items-center justify-center">
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </div>
  )
}
