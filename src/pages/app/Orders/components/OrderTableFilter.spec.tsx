import { renderWithProviders } from '@/_util/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLocation } from 'react-router-dom'
import { OrderTableFilter } from './OrderTableFilter'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location-display">Location:{location.search}</div>
}

describe('OrderTableFilter component', () => {
  it('should add search parameters on the url', async () => {
    renderWithProviders({
      ui: (
        <>
          <OrderTableFilter />
          <LocationDisplay />
        </>
      ),
      path: '/orders',
    })

    const submitButton = screen.getByRole('button', { name: /filter results/i })
    const orderIdInput = screen.getByLabelText('Order Id')
    const locationDisplay = screen.getByTestId('location-display')
    const customerNameInput = screen.getByLabelText('Customer Name')

    expect(orderIdInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(locationDisplay).toBeInTheDocument()
    expect(customerNameInput).toBeInTheDocument()

    const user = userEvent.setup() //create the user
    //simulate the click - this is a promise, so the function must be async
    await user.type(orderIdInput, 'abc') //simulate the action
    await user.click(submitButton) //simulate the action

    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        'orderId=abc',
      )
    })
    //simulate the click - this is a promise, so the function must be async
    await user.type(customerNameInput, 'person name') //simulate the action

    await user.click(submitButton) //simulate the action

    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        'customerName=person+name',
      )
    })
  })
  it('should clear the search params with clear button', async () => {
    renderWithProviders({
      ui: (
        <>
          <OrderTableFilter />
          <LocationDisplay />
        </>
      ),
      path: '/orders?orderId=abc&page=1&customerName=Person+Name&status=delivered',
    })
    const clearButton = screen.getByRole('button', { name: /reset filters/i })

    const user = userEvent.setup() //create the user
    await user.click(clearButton)

    await waitFor(() => {
      expect(screen.getByTestId('location-display')).not.toHaveTextContent(
        'customerName=person+name',
      )
      expect(screen.getByTestId('location-display')).not.toHaveTextContent(
        'orderId=abc',
      )
    })
  })
  it('should render the search params if present', async () => {
    renderWithProviders({
      ui: <OrderTableFilter />,
      path: '/orders?orderId=abc&page=1&customerName=Person+Name&status=delivered',
    })
    const orderIdInput = screen.getByLabelText('Order Id') as HTMLInputElement
    const customerNameInput = screen.getByLabelText(
      'Customer Name',
    ) as HTMLInputElement
    const statusSelector = screen.getByRole('combobox')

    await waitFor(() => {
      expect(orderIdInput.value).toEqual('abc')
      expect(customerNameInput.value).toEqual('Person Name')
      expect(statusSelector).toHaveTextContent('Delivered')
    })
  })
})
