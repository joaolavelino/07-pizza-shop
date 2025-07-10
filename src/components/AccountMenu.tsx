import { ACCOUNT_MENU_LINKS } from '@/_constants/constants'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/signOut'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { getManagedRestaurant } from '@/api/get-managed-restaurant'

export const AccountMenu: React.FC = () => {
  const { data: restaurantProfile } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagedRestaurant,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex h-10 gap-2 rounded-4xl select-none"
        >
          <ChevronDown /> {restaurantProfile?.name || 'Menu'}
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
  const queryClient = useQueryClient()

  const { mutateAsync: signOutFn, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear() //clear cached queries
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
      <DropdownMenuItem
        onClick={() => signOutFn()}
        disabled={isPending}
        aria-busy={isPending}
        aria-disabled={isPending}
      >
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
