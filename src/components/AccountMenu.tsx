import { ACCOUNT_MENU_LINKS, NAV_LINKS } from '@/_constants/constants'
import { GET_PROFILE_KEY, getProfile } from '@/api/get-profile'
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
import {
  getManagedRestaurant,
  MANAGED_RESTAURANT_KEY,
} from '@/api/get-managed-restaurant'
import { ThemeToggle } from './ThemeToggle'
import { Skeleton } from './ui/skeleton'

export const AccountMenu: React.FC = () => {
  const { data: restaurantProfile, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: [MANAGED_RESTAURANT_KEY],
      queryFn: getManagedRestaurant,
    })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex h-10 gap-2 rounded-4xl select-none"
        >
          {isLoadingManagedRestaurant ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <>
              <ChevronDown /> {restaurantProfile?.name || 'Menu'}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex h-screen w-screen flex-col md:h-auto md:w-56"
      >
        <AccountMenuLabel />

        <div className="flex-1">
          <div className="md:hidden">
            <DropdownMenuSeparator />
            <NavigationMenuContent />
          </div>
          <DropdownMenuSeparator />
          <AccountMenuContent />
        </div>
        <div className="md:hidden">
          <DropdownMenuLabel>
            <ThemeToggle />
          </DropdownMenuLabel>
        </div>
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
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [GET_PROFILE_KEY],
    queryFn: getProfile,
  })
  return (
    <DropdownMenuLabel className="flex flex-col">
      {isLoadingProfile ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-3 w-40" />
        </div>
      ) : (
        <>
          <span>{userProfile?.name}</span>
          <span className="text-muted-foreground text-sm font-normal">
            {userProfile?.email}
          </span>
        </>
      )}
    </DropdownMenuLabel>
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
