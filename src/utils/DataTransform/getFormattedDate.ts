import { formatDistanceToNowStrict } from 'date-fns'

export const getReadableDate = (dateToFormat: string, addSuffix = false) => {
  return formatDistanceToNowStrict(new Date(dateToFormat), {
    addSuffix,
  })
}
