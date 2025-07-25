import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'
import userEvent from '@testing-library/user-event'

const currentPageIndex = 2
const entriesNumber = 50
const entriesPerPage = 10
const pages = Math.ceil(entriesNumber / entriesPerPage) || 1
const lastPageIndex = pages - 1
const onPageChangeCallback = vi.fn() //this is a spy function (vi refers to vitest)

describe('Pagination component', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })
  it('should display the correct number of pages, correct page number and entries ', async () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={currentPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const entriesAmount = screen.getByText(`Total of ${entriesNumber} items`)
    const pageNumber = screen.getByText(
      `Page ${currentPageIndex + 1} of ${pages}`,
    ) //page 3 because page index starts on zero
    expect(entriesAmount).toBeInTheDocument()
    expect(pageNumber).toBeInTheDocument()
  })
  it('should navigate to the next page ', async () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={currentPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const nextPageButton = screen.getByRole('button', { name: 'Next page' })

    // User Event Simulation
    const user = userEvent.setup() //create the user
    //simulate the click - this is a promise, so the function must be async
    await user.click(nextPageButton) //simulate the action

    expect(onPageChangeCallback).toBeCalledWith(currentPageIndex + 1)
  })
  it('should navigate to the previous page ', async () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={currentPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const previousPageButton = screen.getByRole('button', {
      name: 'Previous page',
    })

    // User Event Simulation
    const user = userEvent.setup() //create the user
    //simulate the click - this is a promise, so the function must be async
    await user.click(previousPageButton) //simulate the action

    expect(onPageChangeCallback).toBeCalledWith(currentPageIndex - 1)
  })
  it('should navigate to the first page ', async () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={currentPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const firstPageButton = screen.getByRole('button', {
      name: 'Back to the first page',
    })

    // User Event Simulation
    const user = userEvent.setup() //create the user
    //simulate the click - this is a promise, so the function must be async
    await user.click(firstPageButton) //simulate the action

    expect(onPageChangeCallback).toBeCalledWith(0)
  })
  it('should navigate to the last page ', async () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={currentPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const lastPageButton = screen.getByRole('button', {
      name: 'Last page',
    })

    // User Event Simulation
    const user = userEvent.setup() //create the user
    //simulate the click - this is a promise, so the function must be async
    await user.click(lastPageButton) //simulate the action

    expect(onPageChangeCallback).toBeCalledWith(lastPageIndex)
  })
  it('should disable next and last page buttons on the last page ', () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={lastPageIndex}
        perPage={entriesPerPage}
      />,
    )

    const lastPageButton = screen.getByRole('button', {
      name: 'Last page',
    })
    const nextPageButton = screen.getByRole('button', { name: 'Next page' })

    expect(lastPageButton).toHaveAttribute('disabled')
    expect(nextPageButton).toHaveAttribute('disabled')
  })
  it('should disable next and last page buttons on the last page ', () => {
    render(
      <Pagination
        entriesNumber={entriesNumber}
        onPageChange={onPageChangeCallback}
        pageIndex={0}
        perPage={entriesPerPage}
      />,
    )

    const firstPageButton = screen.getByRole('button', {
      name: 'Back to the first page',
    })
    const previousPageButton = screen.getByRole('button', {
      name: 'Previous page',
    })

    expect(firstPageButton).toHaveAttribute('disabled')
    expect(previousPageButton).toHaveAttribute('disabled')
  })
})
