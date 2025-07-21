import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { createTestQueryClient } from '../../test/testQueryClient'
import { MemoryRouter } from 'react-router-dom'

interface RenderWithProvidersOptions extends RenderOptions {
  ui: ReactNode
  path?: string
  queryClient?: QueryClient
}

const testQueryClient = createTestQueryClient()

export function renderWithProviders({
  ui,
  path = '*',
  queryClient = testQueryClient,
}: RenderWithProvidersOptions) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  )
}
