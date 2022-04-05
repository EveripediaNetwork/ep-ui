import config from '@/config'
import { WikiTitle } from '@/services/nav-search'
import { Wiki } from '@/types/Wiki'

export const getWikiImageUrl = (wiki?: Partial<Wiki> | WikiTitle) => {
  return `${config.pinataBaseUrl}${wiki?.images ? wiki?.images[0]?.id : ''}`
}
