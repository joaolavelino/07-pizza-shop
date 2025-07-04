import { useTheme } from '@/styles/themeProvider'
import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'

export interface ThemeToggleProps {}

export const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const { setTheme, theme } = useTheme()

  return (
    <div className="bg-muted w-[122px] overflow-hidden rounded-4xl border-1 p-0">
      <Button
        className="rounded-4xl"
        variant={`${theme == 'light' ? 'default' : 'ghost'}`}
        onClick={() => setTheme('light')}
      >
        <Sun />
      </Button>
      <Button
        className="rounded-4xl"
        variant={`${theme == 'dark' ? 'default' : 'ghost'}`}
        onClick={() => setTheme('dark')}
      >
        <Moon />
      </Button>
      <Button
        className="rounded-4xl"
        variant={`${theme == 'system' ? 'default' : 'ghost'}`}
        onClick={() => setTheme('system')}
      >
        <Laptop />
      </Button>
    </div>
  )
}
