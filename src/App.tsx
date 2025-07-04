import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { ThemeProvider } from './styles/themeProvider'
import { Toaster } from 'sonner'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizza-shop-ui-theme">
      <RouterProvider router={router} />
      <Toaster closeButton richColors />
    </ThemeProvider>
  )
}

export default App
