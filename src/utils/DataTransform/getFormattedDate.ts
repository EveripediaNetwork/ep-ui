import { formatDistanceToNowStrict } from 'date-fns'

export const getReadableDate = (dateToFormat: string) => {
  return formatDistanceToNowStrict(new Date(dateToFormat), {
    addSuffix: false,
  })
}
