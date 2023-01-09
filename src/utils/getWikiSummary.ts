import { Wiki, WikiPreview } from '@everipedia/iq-utils'
import { shortenText } from './shortenText'

export enum WikiSummarySize {
  Small = 65,
  Medium = 70,
  BIG = 110,
  Huge = 160,
}

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiPreview,
  size: WikiSummarySize = WikiSummarySize.Huge,
) => {
  if (wiki.summary) return shortenText(wiki.summary, size)
  return ''
}
