import { bgPictures } from '@/_constants/constants'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/styles/themeProvider'
import { Pizza } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export interface AuthLayoutProps {}

export const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { theme } = useTheme()
  const [picture, setPicture] = useState<{ url: string; creator: string }>(
    bgPictures.system,
  )

  useEffect(() => {
    setPicture(bgPictures[theme])
  }, [theme])

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div
        className={`border-r-2-foreground text-muted-foreground flex h-full flex-col justify-between ${picture?.url} bg-cover bg-center`}
      >
        <h1 className="text-foreground flex items-center gap-3 p-8 text-4xl font-thin">
          <Pizza strokeWidth={1} size={40} /> pizza.shop
        </h1>
        <div className="flex h-full flex-col lg:hidden">
          <main className="flex flex-1 flex-col items-center justify-center">
            <Outlet />
          </main>
          <footer></footer>
        </div>
        <footer className="text-center text-sm">
          <div className="flex justify-center pb-4 lg:hidden">
            <ThemeToggle />
          </div>
          <div
            className={`rounded-md ${theme == 'light' ? 'bg-[#ffffff65]' : 'bg-[#00000095]'} p-4`}
          >
            <p>
              Painel do Parceiro &copy; pizza.shop - {new Date().getFullYear()}
            </p>
            <p>Created during the React learning path from Rocketseat. </p>
            <p>Photo &copy; {picture.creator}</p>
            <Button asChild variant="link">
              <a
                className="mt-2 italic"
                href="https://github.com/joaolavelino/06-ingite-github-blog/issues"
              >
                Check here all the learning notes on Github
              </a>
            </Button>
          </div>
        </footer>
      </div>
      <div className="hidden h-full flex-col lg:flex">
        <main className="relative flex flex-1 flex-col items-center justify-center">
          <Outlet />
        </main>
        <footer className="flex justify-end p-10">
          <ThemeToggle />
        </footer>
      </div>
    </div>
  )
}
