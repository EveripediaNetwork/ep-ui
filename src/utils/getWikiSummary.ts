import { WikiTitle } from '@/services/nav-search'
import { Wiki } from '@/types/Wiki'
import { shortenText } from './shortenText'

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiTitle,
  size?: number,
) => {
  return shortenText(wiki?.content || '', size || 150)
}
