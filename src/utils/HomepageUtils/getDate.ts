export const getDateRange = (dayRange = 1) => {
  const startOfDay = new Date()
  const endOfDay =
    new Date() - dayRange * 24 * 60 * 60 * 1000

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
