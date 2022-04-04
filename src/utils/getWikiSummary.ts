import { WikiTitle } from '@/services/nav-search'
import { Wiki } from '@/types/Wiki'
import { shortenText } from './shortenText'

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiTitle,
  size?: 'small' | 'medium' | 'large',
) => {
  const sizeMap = {
    small: 50,
    medium: 70,
    large: 160,
  }
  return shortenText(wiki?.content || '', sizeMap[size || 'small'])
}
