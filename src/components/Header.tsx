import { NAV_LINKS } from '@/_constants/constants'
import { Pizza } from 'lucide-react'
import { NavigationLink } from './NavLink'
import { ThemeToggle } from './ThemeToggle'
import { Separator } from './ui/separator'
import { AccountMenu } from './AccountMenu'

export const Header: React.FC = () => {
  return (
    <header className="justify-betwee flex h-16 items-center justify-between border-b px-8 py-2">
      <div className="flex items-center gap-6">
        <h1 className="text-foreground flex items-center gap-3 text-2xl font-thin">
          <Pizza strokeWidth={1} size={24} /> pizza.shop
        </h1>
        <Separator orientation="vertical" />
        <nav className="text-muted-foreground flex items-center space-x-4 lg:space-x-6">
          {NAV_LINKS.map((link) => (
            <NavigationLink key={link.name} to={link.url}>
              <link.icon />
              {link.name}
            </NavigationLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AccountMenu />
      </div>
    </header>
  )
}
