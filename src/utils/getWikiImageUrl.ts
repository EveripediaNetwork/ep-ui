import config from '@/config'
import { Wiki, WikiPreview } from '@/types/Wiki'

export const getWikiImageUrl = (wiki?: Partial<Wiki> | WikiPreview) => {
  return `${config.pinataBaseUrl}${wiki?.images ? wiki?.images[0]?.id : ''}`
}
