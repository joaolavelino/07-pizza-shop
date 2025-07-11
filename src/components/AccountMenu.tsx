import { NAV_LINKS } from '@/_constants/constants'
import {
  getManagedRestaurant,
  MANAGED_RESTAURANT_KEY,
} from '@/api/get-managed-restaurant'
import { GET_PROFILE_KEY, getProfile } from '@/api/get-profile'
import { signOut } from '@/api/signOut'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Building, ChevronDown, LoaderCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { StoreProfileDialog } from './StoreProfileDlialog'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { useState } from 'react'

export const AccountMenu: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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

  const { data: restaurantProfile, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: [MANAGED_RESTAURANT_KEY],
      queryFn: getManagedRestaurant,
      staleTime: 1000 * 60 * 60 * 24,
    })

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [GET_PROFILE_KEY],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 60 * 24,
  })

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

          <div className="flex-1">
            {/* Navigation Links that will render only on mobile */}
            <div className="md:hidden">
              <DropdownMenuSeparator />
              <nav>
                {NAV_LINKS.map((link) => (
                  <DropdownMenuItem key={link.name}>
                    <link.icon className="mr-2" />
                    <span>{link.name}</span>
                  </DropdownMenuItem>
                ))}
              </nav>
            </div>

            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building />
                <span>Shop Profile</span>
              </DropdownMenuItem>
            </DialogTrigger>
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
          </div>

          {/* Theme toggle that will render only on mobile */}
          <div className="md:hidden">
            <DropdownMenuLabel>
              <ThemeToggle />
            </DropdownMenuLabel>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog closeFn={closeDialog} />
    </Dialog>
  )
}
