import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SignInPage } from './SignInPage'
import { queryClient } from '@/lib/reactQuery'

describe('SignInPage page component', () => {
  it('should render the email address if present on search params', async () => {
    render(
      <MemoryRouter initialEntries={['/sign-in?email=johndoe@example.com']}>
        <QueryClientProvider client={queryClient}>
          <SignInPage />
        </QueryClientProvider>
      </MemoryRouter>,
    )
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    expect(emailInput.value).toEqual('johndoe@example.com')
  })
})
