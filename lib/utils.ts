import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency Format
export const formatPrice = (price: number) => {
  // const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return formattedPrice
}

// Date Format
export const relativeDate = (fromDate: Date) => {
  return formatDistanceToNowStrict(fromDate, { addSuffix: true })
}
