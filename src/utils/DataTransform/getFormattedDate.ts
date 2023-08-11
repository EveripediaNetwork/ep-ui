import { formatDistanceToNowStrict } from 'date-fns'

export const getReadableDate = (dateToFormat: string) => {
  const parsedDate = new Date(dateToFormat)
  if (isNaN(parsedDate.getTime())) {
    return ''
  }
  return formatDistanceToNowStrict(parsedDate, {
    addSuffix: false,
  })
}
