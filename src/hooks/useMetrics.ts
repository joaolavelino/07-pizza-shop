import { formatCurrency } from '@/_util/format'
import {
  GET_METRICS_MONTH_CANCELED_AMOUNT,
  getMonthCanceledOrdersAmount,
} from '@/api/get-metrics-canceled-orders-month'
import {
  GET_METRICS_DAY_AMOUNT,
  getDayOrdersAmount,
} from '@/api/get-metrics-day-amount'
import {
  GET_METRICS_MONTH_AMOUNT,
  getMonthOrdersAmount,
} from '@/api/get-metrics-month-amount'
import {
  GET_METRICS_MONTH_RECEIPT,
  getMonthOrderReceipt,
} from '@/api/get-metrics-month-receipt'
import { useQuery } from '@tanstack/react-query'
import {
  CalendarCheck,
  ChartSpline,
  CircleOff,
  DollarSign,
  type LucideIcon,
} from 'lucide-react'

interface MetricsCardInfo {
  title: string
  icon: LucideIcon
  infoPrimary: string | number | undefined
  infoSecondary: number | undefined
  isLoading: boolean
}

export function useMetrics() {
  const { data: dayOrdersAmount, isLoading: isDayOrdersAmountLoading } =
    useQuery({
      queryKey: [GET_METRICS_DAY_AMOUNT],
      queryFn: getDayOrdersAmount,
    })
  const { data: monthOrdersAmount, isLoading: isMonthOrdersAmountLoading } =
    useQuery({
      queryKey: [GET_METRICS_MONTH_AMOUNT],
      queryFn: getMonthOrdersAmount,
    })
  const { data: monthReceipt, isLoading: isMonthReceiptLoading } = useQuery({
    queryKey: [GET_METRICS_MONTH_RECEIPT],
    queryFn: getMonthOrderReceipt,
  })
  const {
    data: monthCanceledOrdersAmount,
    isLoading: ismonthCanceledOrdersAmountLoading,
  } = useQuery({
    queryKey: [GET_METRICS_MONTH_CANCELED_AMOUNT],
    queryFn: getMonthCanceledOrdersAmount,
  })

  const metrics = {
    dayOrdersAmount,
    monthOrdersAmount,
    monthReceipt,
    monthCanceledOrdersAmount,
  }

  const metricsLoading = {
    isDayOrdersAmountLoading,
    isMonthOrdersAmountLoading,
    isMonthReceiptLoading,
    ismonthCanceledOrdersAmountLoading,
  }

  const formattedCurrency = monthReceipt
    ? formatCurrency(monthReceipt.receipt / 100)
    : '0'

  const metricsCardsInfo: Record<string, MetricsCardInfo> = {
    dayOrdersAmount: {
      title: "Today's Orders",
      icon: CalendarCheck,
      infoPrimary: dayOrdersAmount?.amount,
      infoSecondary: dayOrdersAmount?.diffFromYesterday,
      isLoading: isDayOrdersAmountLoading,
    },
    monthOrdersAmount: {
      title: 'Total Orders (month)',
      icon: ChartSpline,
      infoPrimary: monthOrdersAmount?.amount,
      infoSecondary: monthOrdersAmount?.diffFromLastMonth,
      isLoading: isMonthOrdersAmountLoading,
    },
    monthReceipt: {
      title: 'Total Revenue (month)',
      icon: DollarSign,
      infoPrimary: formattedCurrency,
      infoSecondary: monthReceipt?.diffFromLastMonth,
      isLoading: isMonthReceiptLoading,
    },
    monthCanceledOrdersAmount: {
      title: 'Canceled Orders (month)',
      icon: CircleOff,
      infoPrimary: monthCanceledOrdersAmount?.amount,
      infoSecondary: monthCanceledOrdersAmount?.diffFromLastMonth,
      isLoading: ismonthCanceledOrdersAmountLoading,
    },
  }

  return {
    metrics,
    metricsLoading,
    metricsCardsInfo,
  }
}
