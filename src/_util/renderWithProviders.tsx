import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { createTestQueryClient } from '../../test/testQueryClient'
import { MemoryRouter, useLocation } from 'react-router-dom'

interface RenderWithProvidersOptions extends RenderOptions {
  ui: ReactNode
  path?: string
  queryClient?: QueryClient
  locationDisplay?: boolean
}

const testQueryClient = createTestQueryClient()

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location-display">{location.search}</div>
}

export function renderWithProviders({
  ui,
  path = '*',
  queryClient = testQueryClient,
  locationDisplay = false,
}: RenderWithProvidersOptions) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        {ui}
        {locationDisplay && <LocationDisplay />}
      </QueryClientProvider>
    </MemoryRouter>,
  )
}
