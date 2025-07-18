import { render } from '@testing-library/react'
import { OrderStatus } from './OrderStatus'

describe('Order status component', () => {
  it('should display the right information based on the provided order status - canceled', () => {
    //status canceled
    const wrapper = render(<OrderStatus status="canceled" />)

    // wrapper.debug() // this shows what's being rendered on the test

    const statusText = wrapper.getByText('Canceled')
    const statusIcon = wrapper.getByLabelText('status-icon')
    //console.log(statusText.outerHTML) //this renders the HTML element that wraps the queried text
    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-circle-x')
    expect(statusIcon).toHaveClass('text-rose-500')
  })
  it('should display the right information based on the provided order status - processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)

    const statusText = wrapper.getByText('Processing')
    const statusIcon = wrapper.getByLabelText('status-icon')
    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-cog')
    expect(statusIcon).toHaveClass('text-amber-500')
  })
  it('should display the right information based on the provided order status - delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)

    const statusText = wrapper.getByText('Delivering')
    const statusIcon = wrapper.getByLabelText('status-icon')

    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-truck')
    expect(statusIcon).toHaveClass('text-amber-500')
  })
  it('should display the right information based on the provided order status - delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)

    const statusText = wrapper.getByText('Delivered')
    const statusIcon = wrapper.getByLabelText('status-icon')

    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-circle-check')
    expect(statusIcon).toHaveClass('text-emerald-500')
  })
  it('should display the right information based on the provided order status - pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    const statusText = wrapper.getByText('Pending')
    const statusIcon = wrapper.getByLabelText('status-icon')

    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-clock')
    expect(statusIcon).toHaveClass('text-muted-foreground')
  })

  it('should display the test on any display size when recieving the "full" prop', () => {
    const wrapper = render(<OrderStatus status="canceled" full />)

    const statusText = wrapper.getByText('Canceled')

    expect(statusText).not.toHaveClass('hidden')
  })
})
