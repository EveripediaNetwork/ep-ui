import type { BaseEvents } from '@everipedia/iq-utils'

interface Location {
  country?: string
}

// Helper function to determine if eventLocation is non-empty
export const isEventLocation = (location: Location | Location[]) => {
  if (!location) return false
  if (Array.isArray(location)) return location.length > 0
  return true
}

// Helper function to extract country from the location
export const getCountry = (location: Location | Location[]) => {
  if (Array.isArray(location)) {
    return location[0]?.country || ''
  }
  return location?.country || ''
}

export const sortEvents = (events: BaseEvents[]) => {
  return events.sort((a, b) => {
    const startDateA = a.multiDateStart
      ? new Date(a.multiDateStart)
      : new Date(a.date)
    const startDateB = b.multiDateStart
      ? new Date(b.multiDateStart)
      : new Date(b.date)

    if (startDateA.getTime() !== startDateB.getTime()) {
      return startDateA.getTime() - startDateB.getTime()
    }

    const endDateA = a.multiDateEnd ? new Date(a.multiDateEnd) : null
    const endDateB = b.multiDateEnd ? new Date(b.multiDateEnd) : null

    if (endDateA && endDateB) {
      return endDateA.getTime() - endDateB.getTime()
    }

    return 0
  })
}
