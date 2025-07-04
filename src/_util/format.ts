export const formatDate = new Intl.DateTimeFormat('en-UK')
export const formatCurrency = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: '€',
})
