import { createBrowserRouter } from 'react-router-dom'
import { DashboardPage } from './pages/app/DashboardPage'
import { SignInPage } from './pages/auth/SignInPage'
import { AppLayout } from './pages/_layout/AppLayout'
import { AuthLayout } from './pages/_layout/AuthLayout'
import { PageTitle } from './_util/pageTitle'
import { SignUpPage } from './pages/auth/SignUpPage'
import { OrdersPage } from './pages/app/OrdersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage title={PageTitle('Dashboard')} /> },
      { path: '/orders', element: <OrdersPage /> },
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
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
])
