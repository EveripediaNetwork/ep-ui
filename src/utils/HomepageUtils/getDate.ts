export const getDateRange = (dayRange = 1) => {
  const yday = new Date(new Date().getTime() - (dayRange * 24 * 60 * 60 * 1000))
  const today = new Date()

  const startDay = new Date(yday).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const endDay = new Date(today).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return { startDay, endDay }
}
