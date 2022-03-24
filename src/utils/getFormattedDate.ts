import { formatDistance } from 'date-fns'

export const getReadableDate = (dateToFormat: string) => {
  return formatDistance(new Date(dateToFormat), new Date(), { addSuffix: true })
}
