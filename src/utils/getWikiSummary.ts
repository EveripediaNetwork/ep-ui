import { Wiki, WikiPreview } from '@/types/Wiki'
import RemoveMarkdown from 'remove-markdown'
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
  if (wiki.content) {
    const trimmedContent = shortenText(wiki.content, size + 100)
    const cleanedContentSummary = RemoveMarkdown(trimmedContent)
    return shortenText(cleanedContentSummary, size)
  }
  return ''
}
