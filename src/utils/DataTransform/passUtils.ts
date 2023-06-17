export const dateDetails = (endDate: number) => {
  const currentDate = Date.now()
  const endTimestamp = new Date(endDate * 1000).getTime()
  const oneDay = 24 * 60 * 60 * 1000
  const difference = Math.round(Math.abs(endTimestamp - currentDate) / oneDay)
  let text = ''
  if (endTimestamp >= currentDate) {
    text = `Subscription expires in ${difference} day(s)`
  } else {
    text = 'Brain Pass Subscription has expired'
  }
  const endDateVal = new Date(endDate * 1000)
  const month = endDateVal.getMonth() + 1
  const day = endDateVal.getDate()
  const year = endDateVal.getFullYear()

  const formattedDate = `${day}. ${month}. ${year}`

  return { text, formattedDate }
}