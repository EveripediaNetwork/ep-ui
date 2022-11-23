import config from '@/config'
import { Image } from '@/types/Wiki'

export const getWikiImageUrl = (imageObj?: Image[]) => {
  return `${config.pinataBaseUrl}${imageObj ? imageObj[0]?.id : ''}`
}
