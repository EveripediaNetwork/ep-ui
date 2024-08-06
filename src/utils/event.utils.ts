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
