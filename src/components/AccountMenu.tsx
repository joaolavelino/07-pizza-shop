import { ACCOUNT_MENU_LINKS } from '@/_constants/constants'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/signOut'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronDown, LoaderCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
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
  const navigate = useNavigate()

  const { mutateAsync: signOutFn, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success('Sign-out success')
      navigate('/sign-in')
    },
    onError: (error) => {
      toast.error(error.name || 'Sign-out Failed', {
        description: error.message || 'An error ocurred, try again',
      })
    },
  })

  return (
    <>
      {ACCOUNT_MENU_LINKS.map((link) => (
        <DropdownMenuItem key={link.name}>
          <link.icon />
          <span>{link.name}</span>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem onClick={() => signOutFn()} disabled={isPending}>
        <LogOut className="text-rose-500 dark:text-rose-400" />
        <span className="text-rose-500 dark:text-rose-400">Sign-out</span>
        {isPending && <LoaderCircle className="animate-spin" />}
      </DropdownMenuItem>
    </>
  )
}

export const AccountMenuLabel: React.FC = () => {
  const { data: userProfile } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getProfile,
  })

  return (
    <DropdownMenuLabel className="flex flex-col">
      <span>{userProfile?.name}</span>
      <span className="text-muted-foreground text-sm font-normal">
        {userProfile?.email}
      </span>
    </DropdownMenuLabel>
  )
}
