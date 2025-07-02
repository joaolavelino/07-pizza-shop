import type { DefaultPageProps } from '@/_types/pagesTypes'

export interface SignInPageProps extends DefaultPageProps {}

export const SignInPage: React.FC<SignInPageProps> = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <h1>Sign-in Page</h1>
    </>
  )
}
