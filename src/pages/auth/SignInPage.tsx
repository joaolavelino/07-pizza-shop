import type { DefaultPageProps } from '@/_types/pagesTypes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucidePizza } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export interface SignInPageProps extends DefaultPageProps {}

const signInSchema = z.object({
  email: z.string().email('Insert a valid e-mail address.'),
})

type signInFormType = z.infer<typeof signInSchema>

export const SignInPage: React.FC<SignInPageProps> = ({ title }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormType>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignIn(data: signInFormType) {
    try {
      const randomNumber: number = await new Promise((resolve) =>
        setTimeout(() => resolve(Math.floor(Math.random() * 100)), 2000),
      )
      if (randomNumber % 2 == 0) {
        toast.success('Login success', {
          description:
            'Check your e-mail for your personalized authentification link.',
        })
      } else {
        throw new Error('Email not registered.')
      }
    } catch (error) {
      toast.error('Login failed', {
        description:
          'Email address not registered. Create an account or try again.',
      })
      console.log(error)
    }
    console.log(data)
  }
  return (
    <>
      <title>{title}</title>
      <div className="bg-muted rounded-sm border-1 p-6">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-thin tracking-tight">
              Access dashboard
            </h1>
            <p className="text-muted-foreground text-sm font-light">
              Track your sales through the partner dashboard
            </p>
          </div>

          <form
            action=""
            className="space-y-4"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LucidePizza className="animate-spin" />
              ) : (
                'Log-in'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
