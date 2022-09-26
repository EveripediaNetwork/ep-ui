import config from '@/config'
import { Wiki, WikiPreview } from '@/types/Wiki'
import { CreatedWikisCount } from '@/types/admin'

export const getWikiImageUrl = (
  wiki?: Partial<Wiki> | WikiPreview | CreatedWikisCount,
) => {
  return `${config.pinataBaseUrl}${wiki?.images ? wiki?.images[0]?.id : ''}`
}
