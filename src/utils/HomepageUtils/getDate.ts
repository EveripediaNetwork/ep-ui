export const formatDate = (dateString: number) => {
  const date = new Date(dateString)
  let month = `${date.getMonth() + 1}`
  let day = `${date.getDate()}`
  const year = date.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('/')
}

export const getDateRange = () => {
  const startOfDay = new Date().setUTCHours(0, 0, 0, 0)
  const endOfDay = new Date().setUTCHours(23, 59, 59, 999)

  const startDay = formatDate(startOfDay)
  const endDay = formatDate(endOfDay)

  return { startDay, endDay }
}
