import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const day = date.getDate()
  const suffix = ['th', 'st', 'nd', 'rd']
  const suffixIndex =
    day % 10 === 1 && day !== 11
      ? 1
      : day % 10 === 2 && day !== 12
      ? 2
      : day % 10 === 3 && day !== 13
      ? 3
      : 0
  return day + suffix[suffixIndex]
}

export function parseDateRange(isoString: string) {
  const dates = isoString.split('/')
  const start = new Date(dates[0])
  const end = dates.length > 1 ? new Date(dates[1]) : null

  const startFormatted = formatDate(start)
  const month = start.toLocaleString('en-US', { month: 'long' })
  const year = start.getFullYear()

  if (end) {
    const endFormatted = formatDate(end)
    return `${startFormatted}-${endFormatted}, ${month} ${year}`
  } else {
    return `${startFormatted}, ${month} ${year}`
  }
}
