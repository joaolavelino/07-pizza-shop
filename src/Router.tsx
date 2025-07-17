import { createBrowserRouter } from 'react-router-dom'
import { DashboardPage } from './pages/app/Dashboard/DashboardPage'
import { SignInPage } from './pages/auth/SignInPage'
import { AppLayout } from './pages/_layout/AppLayout'
import { AuthLayout } from './pages/_layout/AuthLayout'
import { SignUpPage } from './pages/auth/SignUpPage'
import { OrdersPage } from './pages/app/Orders/OrdersPage'
import { NotFoundPage } from './pages/404'
import { ErrorPage } from './pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/orders', element: <OrdersPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*', //any path not listed above
    element: <NotFoundPage />,
  },
])
