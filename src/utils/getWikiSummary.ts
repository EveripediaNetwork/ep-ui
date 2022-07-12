import { Wiki, WikiPreview } from '@/types/Wiki'
import { shortenText } from './shortenText'
import RemoveMarkdown from 'remove-markdown'

export enum WikiSummarySize {
  Small = 65,
  Medium = 70,
  Big = 250,
}

export const getWikiSummary = (
  wiki: Partial<Wiki> | WikiPreview,
  size: WikiSummarySize = WikiSummarySize.Big,
) => {
  return RemoveMarkdown(shortenText(wiki.summary || wiki.content || '', size))
}
