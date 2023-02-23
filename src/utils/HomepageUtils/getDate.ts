export const getDateRange = ({ dayRange = 1, rangeType = 'today' }) => {
  let startDate
  let endDate

  if (!rangeType) {
    const yday = new Date().getTime() - dayRange * 24 * 60 * 60 * 1000
    const today = new Date()

    startDate = new Date(yday).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    endDate = new Date(today).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  if (rangeType === 'today') {
    endDate = new Date()
    startDate = new Date(endDate.getTime() - dayRange * 24 * 60 * 60 * 1000)
  } else if (rangeType === 'lastWeek') {
    endDate = new Date()
    startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
  } else if (rangeType === 'lastMonth') {
    endDate = new Date()
    startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth() - 1,
      endDate.getDate(),
    )
  } else {
    throw new Error(`Invalid rangeType '${rangeType}'.`)
  }

  const startDay = startDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const endDay = endDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return { startDay, endDay }
}
