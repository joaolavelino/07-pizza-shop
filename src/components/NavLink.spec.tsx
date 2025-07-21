import { screen } from '@testing-library/react'
import { NavigationLink } from './NavLink'
import { renderWithProviders } from '@/_util/renderWithProviders'

describe('NavLink component', () => {
  it('should highlight nav link when its target is the curent page', async () => {
    renderWithProviders({
      ui: (
        <>
          <NavigationLink to={'/home'}>Home</NavigationLink>{' '}
          <NavigationLink to={'/about'}>About</NavigationLink>
        </>
      ),
      path: '/about',
    })

    expect(screen.getByText('About').dataset.current).toEqual('true')
    expect(screen.getByText('Home').dataset.current).toEqual('false')
  })
})
