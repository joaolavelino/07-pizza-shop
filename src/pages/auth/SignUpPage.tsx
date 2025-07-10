import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LucidePizza } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

export interface SignUpPageProps {}

const signInSchema = z.object({
  email: z.string().email('Insert a valid e-mail address.'),
  restaurantName: z.string(),
  managerName: z.string(),
  phoneNumber: z.string(),
})

type signInFormType = z.infer<typeof signInSchema>

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormType>({
    resolver: zodResolver(signInSchema),
  })

  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
    onSuccess: (_, variables) => {
      toast.success('Register success', {
        description: 'Your shop is successfully registered',
        action: {
          label: 'Login',
          onClick: () => {
            navigate(`/sign-in?email=${variables.email}`)
          },
        },
      })
    },
    onError: (error) => {
      toast.error('Register failed', {
        description: error.message,
      })
    },
  })

  async function handleSignIn(data: signInFormType) {
    await registerRestaurantFn({
      restaurantName: data.restaurantName,
      email: data.email,
      managerName: data.managerName,
      phone: data.phoneNumber,
    })
  }
  return (
    <>
      <title>Sign-Up</title>
      <div className="bg-muted rounded-sm border-1 p-6">
        <Button asChild variant="outline" className="absolute top-10 right-10">
          <Link to="/sign-in">Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-thin tracking-tight">
              Create a free account
            </h1>
            <p className="text-muted-foreground text-sm font-light">
              Become a partner and start tracking your sales
            </p>
          </div>

          <form
            action=""
            className="space-y-4"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="phone"
                {...register('phoneNumber')}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LucidePizza className="animate-spin" />
              ) : (
                'Create your account'
              )}
            </Button>
            <p className="text-muted-foreground px-6 text-center text-xs leading-relaxed">
              By creating your account, you accept our{' '}
              <a href="#" className="underline underline-offset-2">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text- underline underline-offset-2">
                Privacy Settings
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
