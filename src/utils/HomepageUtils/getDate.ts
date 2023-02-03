export const getDateRange = (dayRange = 1) => {
  const startOfDay = new Date().getTime() - dayRange * 24 * 60 * 60 * 1000
  const endOfDay = new Date()

  const startDay = new Date(startOfDay).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const endDay = new Date(endOfDay).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return { startDay, endDay }
}
