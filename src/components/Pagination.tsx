import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  entriesNumber: number
  perPage: number
  onPageChange: (pageIndex: number) => void | Promise<void>
}

export const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  perPage,
  entriesNumber,
  onPageChange,
}) => {
  const pages = Math.ceil(entriesNumber / perPage) || 1

  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-muted-foreground text-sm">
        Total of {entriesNumber} items
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={pageIndex == 0}
          >
            <ChevronsLeft />
            <span className="sr-only">Back to the first page</span>
          </Button>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex == 0}
          >
            <ChevronLeft />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="text-muted-foreground text-sm font-medium">
            Page {pageIndex + 1} of {pages}
          </div>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex == pages - 1}
          >
            <ChevronRight />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={pageIndex == pages - 1}
          >
            <ChevronsRight />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
