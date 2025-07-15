import type { OrderStatus } from '@/_types/ordersTypes'
import { Building, Home, UtensilsCrossed } from 'lucide-react'

export const PAGE_TITLE = 'Pizza Shop'

export const bgPictures = {
  light: {
    url: 'bg-[url(pizza-light.jpg)]',
    creator: 'Yuan Cao',
  },
  dark: {
    url: 'bg-[url(pizza-dark.jpg)]',
    creator: 'Rene Strgar',
  },
  system: {
    url: 'bg-[url(pizza-3.jpg)]',
    creator: 'Rene Strgar',
  },
}

export const NAV_LINKS = [
  { url: '/', name: 'Home', icon: Home },
  { url: '/orders', name: 'Orders', icon: UtensilsCrossed },
]

export const ACCOUNT_MENU_LINKS = [
  { url: '/', name: 'Shop Profile', icon: Building },
]

export const CANCELABLE_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'delivering',
]
