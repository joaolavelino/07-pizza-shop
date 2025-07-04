import { ACCOUNT_MENU_LINKS } from '@/_constants/constants'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const AccountMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex h-10 gap-2 rounded-4xl select-none"
        >
          <ChevronDown /> Pizza Shop
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <AccountMenuLabel />
        <DropdownMenuSeparator />
        <AccountMenuContent />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const AccountMenuContent: React.FC = () => {
  const logoutColours = 'text-rose-500 dark:text-rose-400'
  return (
    <>
      {ACCOUNT_MENU_LINKS.map((link) => (
        <DropdownMenuItem
          className={link.name == 'Log-out' ? logoutColours : ''}
          key={link.name}
        >
          <link.icon className={link.name == 'Log-out' ? logoutColours : ''} />
          <span>{link.name}</span>
        </DropdownMenuItem>
      ))}
    </>
  )
}

export const AccountMenuLabel: React.FC = () => {
  return (
    <DropdownMenuLabel className="flex flex-col">
      <span>João Avelino</span>
      <span className="text-muted-foreground text-sm font-normal">
        joaolavelino@gmail.com
      </span>
    </DropdownMenuLabel>
  )
}
