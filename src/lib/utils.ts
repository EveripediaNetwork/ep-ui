import { TEvents } from '@/services/event'
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

export const dateFormater = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Add 1 because months are 0-indexed, and pad with leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const groupEventsByMonth = (events: TEvents[]) => {
  const eventsByMonth: { [key: string]: TEvents[] } = {}

  // Group events by month and year
  events.forEach((event) => {
    const date = event?.events?.[0]?.date
    if (date) {
      const dateParts = date.split('-')
      if (dateParts.length >= 2) {
        const monthNumeric = parseInt(dateParts[1], 10)
        const monthWord = new Date(2000, monthNumeric - 1, 1).toLocaleString(
          'en-us',
          { month: 'long' },
        )
        const key = `${monthWord} ${dateParts[0]}`

        if (!eventsByMonth[key]) {
          eventsByMonth[key] = []
        }

        eventsByMonth[key].push(event)
      }
    }
  })

  // Sort the keys (Month Year) in descending order and create a sorted object
  const sortedKeys = Object.keys(eventsByMonth).sort((a, b) => {
    const yearA = parseInt(a.split(' ')[1], 10)
    const yearB = parseInt(b.split(' ')[1], 10)
    const monthA = new Date(`${a.split(' ')[0]} 1 2000`).getMonth()
    const monthB = new Date(`${b.split(' ')[0]} 1 2000`).getMonth()

    if (yearA < yearB) return 1
    if (yearA > yearB) return -1
    return monthB - monthA
  })

  const sortedEventsByMonth: { [key: string]: TEvents[] } = {}
  sortedKeys.forEach((key) => {
    sortedEventsByMonth[key] = eventsByMonth[key]
  })

  return sortedEventsByMonth
}
