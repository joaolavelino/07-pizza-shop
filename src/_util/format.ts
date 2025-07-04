export const formatDate = new Intl.DateTimeFormat('en-UK')

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
