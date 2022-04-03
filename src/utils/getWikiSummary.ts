import { Wiki } from '@/types/Wiki'
import { shortenText } from './shortenText'

export const getWikiSummary = (wiki: Partial<Wiki>, size?: number) => {
  return shortenText(wiki?.content || '', size || 150)
}
