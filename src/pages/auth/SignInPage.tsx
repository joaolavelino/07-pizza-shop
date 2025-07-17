import { PageTitle } from '@/_util/pageTitle'
import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LucidePizza } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('Insert a valid e-mail address.'),
})

type signInFormType = z.infer<typeof signInSchema>

export const SignInPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn, //axios function created on the /api folder
    onSuccess: () => {
      toast.success('Login success', {
        description:
          'Check your e-mail for your personalized authentification link.',
        action: {
          label: 'Send again',
          onClick: () => {
            toast.success('Sent again')
          },
        },
      })
    },
    onError: (error) => {
      toast.error('Login failed', {
        description: error.message,
      })
      console.error(error)
    },
  })

  async function handleSignIn(data: signInFormType) {
    authenticate({ email: data.email })
  }
  return (
    <>
      <title>{PageTitle('Sign-in')}</title>
      <div className="bg-muted rounded-sm border-1 p-6">
        <Button asChild variant="outline" className="absolute top-10 right-10">
          <Link to="/sign-up">Create an account</Link>
        </Button>
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
