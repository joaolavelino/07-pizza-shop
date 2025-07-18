import { NAV_LINKS } from '@/_constants/constants'
import { Pizza } from 'lucide-react'
import { AccountMenu } from './AccountMenu'
import { NavigationLink } from './NavLink'
import { ThemeToggle } from './ThemeToggle'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <header className="justify-betwee flex h-16 items-center justify-between border-b px-8 py-2">
      <div className="flex items-center gap-6">
        <Link to={'/'}>
          <h1 className="text-foreground flex items-center gap-3 text-2xl font-thin">
            <Pizza strokeWidth={1} size={24} /> pizza.shop
          </h1>
        </Link>

        <nav className="text-muted-foreground hidden items-center space-x-4 md:flex lg:space-x-6">
          {NAV_LINKS.map((link) => (
            <NavigationLink key={link.name} to={link.url}>
              <link.icon />
              {link.name}
            </NavigationLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden gap-2 md:flex">
          <ThemeToggle />
        </div>
        <AccountMenu />
      </div>
    </header>
  )
}
