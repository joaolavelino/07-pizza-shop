import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  getManagedRestaurant,
  MANAGED_RESTAURANT_KEY,
} from '@/api/get-managed-restaurant'
import type { getManagedRestaurantResponse } from '@/api/get-managed-restaurant'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateRestaurantProfile } from '@/api/update-restaurant-profile'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

export interface StoreProfileDialogProps {
  closeFn: () => void
}

const shopProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
})

type ShopProfileData = z.infer<typeof shopProfileSchema>

export const StoreProfileDialog: React.FC<StoreProfileDialogProps> = ({
  closeFn,
}) => {
  const queryClient = useQueryClient()

  const { data: restaurantProfile } = useQuery({
    queryKey: [MANAGED_RESTAURANT_KEY],
    queryFn: getManagedRestaurant,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ShopProfileData>({
    resolver: zodResolver(shopProfileSchema),
    values: {
      description: restaurantProfile?.description ?? '',
      name: restaurantProfile?.name ?? '',
    },
  })

  const { mutateAsync: updateProfileFn, isPending: isUpdateProfilePending } =
    useMutation({
      mutationFn: updateRestaurantProfile,
      onMutate: (data: ShopProfileData) => {
        //get previously cached data
        const previousCachedData =
          queryClient.getQueryData<getManagedRestaurantResponse>([
            MANAGED_RESTAURANT_KEY,
          ])
        //change the cached data with new name, just to update the UI
        queryClient.setQueryData([MANAGED_RESTAURANT_KEY], {
          ...previousCachedData,
          name: data.name,
        })

        return { previousCachedData }
      },
      onSuccess: async () => {
        toast.success('Profile updated', {
          description:
            'Your new restaurant information is already visible for your customers',
        })
        await queryClient.invalidateQueries({
          queryKey: [MANAGED_RESTAURANT_KEY],
        })
        closeFn()
      },
      //I'm not using this second parameter, so I cancel it with my
      onError: (error, _, context) => {
        //revert the changes on the cached info (and UI)
        queryClient.setQueryData(
          [MANAGED_RESTAURANT_KEY],
          context?.previousCachedData,
        )
        toast.error(error.name, { description: `${error.message} Try again` })
      },
    })

  function SubmitFunction(data: ShopProfileData) {
    updateProfileFn({ name: data.name, description: data.description })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          {restaurantProfile?.name} - Shop Profile
        </DialogTitle>
        <DialogDescription>
          Keep your shop's information up to date
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(SubmitFunction)}>
        <div className="space-y-4 py-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="block text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="block text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button type="button" variant={'secondary'} disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="suceess" disabled={isSubmitting}>
            {isSubmitting || isUpdateProfilePending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
