import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavigationLink } from './NavLink'

describe('NavLink component', () => {
  it('should highlight nav link when its target is the curent page', async () => {
    const wrapper = render(
      <>
        <NavigationLink to={'/home'}>Home</NavigationLink>
        <NavigationLink to={'/about'}>About</NavigationLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    expect(wrapper.getByText('About').dataset.current).toEqual('true')
    expect(wrapper.getByText('Home').dataset.current).toEqual('false')
  })
})
