import moment from 'moment'

export const getReadableDate = (dateToFormat: string) => {
  const formattedDate = moment(new Date(dateToFormat))
  return formattedDate.fromNow()
}
