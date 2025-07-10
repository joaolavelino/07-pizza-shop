import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { ThemeProvider } from './styles/themeProvider'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizza-shop-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster closeButton richColors />
    </ThemeProvider>
  )
}

export default App
