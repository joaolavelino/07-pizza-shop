import { formatDistanceToNow } from 'date-fns'

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-UK').format(date)

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export const formatDateToNow = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true })
}
