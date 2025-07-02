import { Outlet } from 'react-router-dom'

export interface AppLayoutProps {}

export const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <>
      <header>
        <h1>Header of the internal pages</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Created during the React learning path from Rocketseat. </p>
        <a href="https://github.com/joaolavelino/06-ingite-github-blog/issues">
          Check here all the learning notes on Github
        </a>
      </footer>
    </>
  )
}
