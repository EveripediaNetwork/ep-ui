export const getDateRange = (dayRange = 1) => {
  const startOfDay = new Date().setUTCHours(0, 0, 0, 0)
  const endOfDay =
    new Date().setUTCHours(23, 59, 59, 999) + dayRange * 24 * 60 * 60 * 1000

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
