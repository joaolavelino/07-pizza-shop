import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCancelOrder } from '@/hooks/useCancelOrder'

import { Check, LoaderCircle } from 'lucide-react'

export interface OrderCancelConfirmationProps {
  orderId: string
  closeFn: () => void
  shouldCloseOnSuccess?: boolean
}

export const OrderCancelConfirmation: React.FC<
  OrderCancelConfirmationProps
> = ({ orderId, closeFn, shouldCloseOnSuccess = true }) => {
  const { cancelOrderFn, isCancelling, isCancelled } = useCancelOrder({
    orderId,
  })

  const handleConfirmation = async () => {
    await cancelOrderFn()
    if (isCancelled && shouldCloseOnSuccess) closeFn()
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cancel Order Confirmation</DialogTitle>
      </DialogHeader>
      <div className="my-8 space-y-4">
        <p>
          Do you really want to cancel the order <strong>{orderId}</strong>?
        </p>
        <p>This action can't be reversed!</p>
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" className="flex-1" onClick={closeFn}>
          Back
        </Button>
        <Button
          onClick={handleConfirmation}
          className="flex-1"
          disabled={isCancelling}
          aria-disabled={isCancelling}
        >
          <>
            {isCancelling ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Check />
            )}
            Confirm
          </>
        </Button>
      </div>
    </DialogContent>
  )
}
