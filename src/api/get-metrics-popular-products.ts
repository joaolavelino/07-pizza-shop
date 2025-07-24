import { api } from '@/lib/axios'

export type getPopularProductsResponse = {
  product: string | null
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<getPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}

export const GET_METRICS_POPULAR_PRODUCTS = 'metrics-popular-products' as const
