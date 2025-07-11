import {
  CheckCircle2,
  Clock,
  Cog,
  Truck,
  XCircle,
  type LucideIcon,
} from 'lucide-react'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

// const orderStatusMap: Record<OrderStatus, string> = {
//   canceled: 'Canceled',
//   delivered: 'Delivered',
//   delivering: 'Delivering',
//   pending: 'Pending',
//   processing: 'Processing',
// }

export interface OrderStatusProps {
  status: OrderStatus
}

type StatusConfig = {
  label: string
  color: string
  icon?: LucideIcon
}

const orderStatusMapComplex: Record<OrderStatus, StatusConfig> = {
  canceled: {
    label: 'Canceled',
    color: 'text-destructive',
    icon: XCircle,
  },
  delivered: {
    label: 'Delivered',
    color: 'text-success',
    icon: CheckCircle2,
  },
  delivering: {
    label: 'Delivering',
    color: 'text-warning',
    icon: Truck,
  },
  pending: {
    label: 'Pending',
    color: 'text-muted-foreground',
    icon: Clock,
  },
  processing: {
    label: 'Processing',
    color: 'text-warning',
    icon: Cog,
  },
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const { color, label, icon: Icon } = orderStatusMapComplex[status]

  return (
    <div className="flex items-center justify-center gap-2 md:justify-start">
      <span className={`text-${color}`}>
        {Icon && <Icon size={16} className={`${color}`} />}
      </span>
      <span className="text-muted-foreground hidden font-medium md:block">
        {label}
      </span>
    </div>
  )
}
