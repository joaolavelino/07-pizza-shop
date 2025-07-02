import { Button } from './components/ui/button'
import { ThemeProvider } from './styles/themeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen items-center justify-center gap-5 bg-zinc-800">
        <h1>Pizza Shop </h1>
        <Button variant={'outline'}>Test Button</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
