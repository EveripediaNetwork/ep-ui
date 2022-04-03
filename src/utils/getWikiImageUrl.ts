import config from '@/config'
import { Wiki } from '@/types/Wiki'

export const getWikiImageUrl = (wiki: Partial<Wiki>) => {
  return `${config.pinataBaseUrl}${wiki?.images ? wiki?.images[0]?.id : ''}`
}
