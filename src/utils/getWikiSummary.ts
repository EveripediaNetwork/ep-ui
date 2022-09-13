import { Wiki, WikiPreview } from '@/types/Wiki'
import { shortenText } from './shortenText'

export enum WikiSummarySize {
  Small = 65,
  Medium = 70,
  Big = 160,
}

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiPreview,
  size: WikiSummarySize = WikiSummarySize.Big,
) => {
  if (wiki.summary) return shortenText(wiki.summary, size)
  return ''
}
