import { NAV_LINKS } from '@/_constants/constants'
import {} from '@radix-ui/react-dropdown-menu'
import { MenuIcon } from 'lucide-react'
import { AccountMenuContent, AccountMenuLabel } from './AccountMenu'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ThemeToggle } from './ThemeToggle'

export const MobileNav: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex h-10 gap-2 rounded-4xl select-none"
        >
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex h-screen w-screen flex-col md:h-auto md:w-56"
      >
        <AccountMenuLabel />
        <DropdownMenuSeparator />
        <div className="flex-1">
          <NavigationMenuContent />
          <DropdownMenuSeparator />
          <AccountMenuContent />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <ThemeToggle />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const NavigationMenuContent: React.FC = () => {
  return (
    <nav>
      {NAV_LINKS.map((link) => (
        <DropdownMenuItem key={link.name}>
          <link.icon className="mr-2" />
          <span>{link.name}</span>
        </DropdownMenuItem>
      ))}
    </nav>
  )
}
