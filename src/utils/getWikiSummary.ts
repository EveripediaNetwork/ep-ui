import { WikiTitle } from '@/services/nav-search'
import { Wiki } from '@/types/Wiki'
import { shortenText } from './shortenText'

export enum WikiSummarySize {
  Small = 65,
  Medium = 70,
  Big = 160,
}

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiTitle,
  size: WikiSummarySize = WikiSummarySize.Big,
) => {
  return shortenText(wiki.content || '', size)
}
