import { renderWithProviders } from '@/_util/renderWithProviders'
import { screen } from '@testing-library/react'
import { SignInPage } from './SignInPage'

describe('SignInPage page component', () => {
  it('should render the email address if present on search params', async () => {
    renderWithProviders({
      ui: <SignInPage />,
      path: '/sign-in?email=johndoe@example.com',
    })
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    expect(emailInput.value).toEqual('johndoe@example.com')
  })
})
