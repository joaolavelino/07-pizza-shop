import { createBrowserRouter } from 'react-router-dom'
import { DashboardPage } from './pages/app/DashboardPage'
import { SignInPage } from './pages/auth/SignInPage'
import { AppLayout } from './pages/_layout/AppLayout'
import { AuthLayout } from './pages/_layout/AuthLayout'
import { PageTitle } from './_util/pageTitle'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage title={PageTitle('Dashboard')} /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage title={PageTitle('Sign in')} />,
      },
    ],
  },
])
