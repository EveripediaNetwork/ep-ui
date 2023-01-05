import config from '@/config'
import { Image } from '@everipedia/iq-utils'

export const getWikiImageUrl = (imageObj?: Image[]) => {
  return `${config.pinataBaseUrl}${imageObj ? imageObj[0]?.id : ''}`
}
