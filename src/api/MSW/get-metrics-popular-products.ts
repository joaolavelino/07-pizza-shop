import { http, HttpResponse } from 'msw'
import type { getPopularProductsResponse } from '../get-metrics-popular-products'

export const popularProductsList = [
  { amount: 34, product: 'Pizza Napoletana' },
  { amount: 32, product: 'Pizza Margherita' },
  { amount: 31, product: 'Pizza Hawaii' },
  { amount: 25, product: 'Pizza Alla Calabresa' },
  { amount: 22, product: 'Pizza Toscana' },
  { amount: 21, product: 'Pizza Corn Bacon' },
  { amount: 19, product: 'Pizza Capricciosa' },
  { amount: 17, product: 'Pizza Quattro Formaggi' },
  { amount: 15, product: 'Pizza Mozzarella' },
  { amount: 12, product: 'Pizza Buratta al Pesto' },
]

export const getPopularProducsMock = http.get<
  never,
  never,
  getPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json(popularProductsList)
})
