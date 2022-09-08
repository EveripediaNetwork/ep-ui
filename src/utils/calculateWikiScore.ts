import { CommonMetaIds, Wiki, WikiPossibleSocialsList } from '@/types/Wiki'
import { getWikiMetadataById } from './getWikiFields'

const MIN_CONTENT_WORD_COUNT = 10
const GOOD_CONTENT_WORD_COUNT = 500
const IDEAL_CONTENT_WORD_COUNT = 1500

const CONTENT_SCORE_WEIGHT = 0.8
const INTERNAL_LINKS_SCORE_WEIGHT = 0.5
const CITATIONS_SCORE_WEIGHT = 0.5
const MEDIA_SCORE_WEIGHT = 0.3
const TAGS_SCORE_WEIGHT = 0.3
const SUMMARY_SCORE_WEIGHT = 0.5
const SOCIAL_SCORE_WEIGHT = 0.5

const IDEAL_INTERNAL_LINKS_COUNT = 10
const IDEAL_CITATIONS_COUNT = 10
const IDEAL_MEDIA_COUNT = 5
const IDEAL_TAGS_COUNT = 3
const IDEAL_SUMMARY_LENGTH = 100
const IDEAL_SOCIAL_MEDIA_COUNT = 4

const contentQuality = (wordCount: number): number => {
  const scoreMin = 0.0
  const scoreMax = 1.0

  let score = 0

  if (wordCount < MIN_CONTENT_WORD_COUNT) {
    return scoreMin
  }

  if (
    wordCount >= MIN_CONTENT_WORD_COUNT &&
    wordCount <= GOOD_CONTENT_WORD_COUNT
  ) {
    score = wordCount / GOOD_CONTENT_WORD_COUNT
    score *= 0.8
  }

  if (
    wordCount > GOOD_CONTENT_WORD_COUNT &&
    wordCount < IDEAL_CONTENT_WORD_COUNT
  ) {
    const baseScore = 0.8
    const wordCountAboveGood = wordCount - GOOD_CONTENT_WORD_COUNT
    const extraScoreFactor =
      wordCountAboveGood / (IDEAL_CONTENT_WORD_COUNT - GOOD_CONTENT_WORD_COUNT)
    const extraScore = Math.sqrt(extraScoreFactor) * 0.2
    score = baseScore + extraScore
  }

  if (wordCount >= IDEAL_CONTENT_WORD_COUNT) {
    return scoreMax
  }

  if (score < scoreMin) {
    return scoreMin
  }

  if (score > scoreMax) {
    return scoreMax
  }

  return score
}

const countQuality = (idealCount: number, realCount: number): number => {
  const scoreMin = 0.0
  const scoreMax = 1.0

  const score = realCount / idealCount

  if (score < scoreMin) {
    return scoreMin
  }

  if (score > scoreMax) {
    return scoreMax
  }

  return score
}

const getHostnameFromRegex = (url: string) => {
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
  return matches && matches[1]
}

const getWikiInternalLinks = (content: string): number => {
  const markdownLinks = content.match(/\[(.*?)\]\((.*?)\)/g)
  let internalLinksCount = 0

  markdownLinks?.forEach(link => {
    const linkMatch = link.match(/\[(.*?)\]\((.*?)\)/)
    const url = linkMatch?.[2]
    if (url && url.charAt(0) !== '#') {
      const hostname = getHostnameFromRegex(url)
      if (
        hostname === 'everipedia.org' ||
        hostname === 'iq.wiki' ||
        hostname?.endsWith('.everipedia.org')
      ) {
        internalLinksCount += 1
      }
    }
  })

  return internalLinksCount
}

const getWikiCitationLinks = (wiki: Wiki) => {
  const rawWikiReferences = getWikiMetadataById(
    wiki,
    CommonMetaIds.REFERENCES,
  )?.value

  if (
    rawWikiReferences === undefined ||
    rawWikiReferences?.trim().length === 0
  ) {
    return 0
  }

  const wikiReferences = JSON.parse(rawWikiReferences)

  return wikiReferences.length
}

const getSocialsCount = (wiki: Wiki): number => {
  let socialsCount = 0
  wiki.metadata.forEach(meta => {
    if (WikiPossibleSocialsList.includes(meta.id as CommonMetaIds)) {
      if (meta.value) {
        socialsCount += 1
      }
    }
  })
  return socialsCount
}

export const calculateWikiScore = (wiki: Wiki): number => {
  const wordCount = wiki.content.split(' ').length
  const internalLinksCount = getWikiInternalLinks(wiki.content)
  const citationCount = getWikiCitationLinks(wiki)
  const mediaCount = wiki.media?.length || 0
  const tagsCount = wiki.tags?.length || 0
  const summaryWordCount = wiki.summary?.length || 0
  const socialsCount = getSocialsCount(wiki)

  const contentScore = contentQuality(wordCount)
  const internalLinksScore = countQuality(
    IDEAL_INTERNAL_LINKS_COUNT,
    internalLinksCount,
  )
  const citationScore = countQuality(IDEAL_CITATIONS_COUNT, citationCount)
  const mediaScore = countQuality(IDEAL_MEDIA_COUNT, mediaCount)
  const tagsScore = countQuality(IDEAL_TAGS_COUNT, tagsCount)
  const summaryScore = countQuality(IDEAL_SUMMARY_LENGTH, summaryWordCount)
  const socialsScore = countQuality(IDEAL_SOCIAL_MEDIA_COUNT, socialsCount)

  const sumOfWeights =
    CONTENT_SCORE_WEIGHT +
    INTERNAL_LINKS_SCORE_WEIGHT +
    CITATIONS_SCORE_WEIGHT +
    MEDIA_SCORE_WEIGHT +
    TAGS_SCORE_WEIGHT +
    SUMMARY_SCORE_WEIGHT +
    SOCIAL_SCORE_WEIGHT

  const score =
    (contentScore * CONTENT_SCORE_WEIGHT +
      internalLinksScore * INTERNAL_LINKS_SCORE_WEIGHT +
      citationScore * CITATIONS_SCORE_WEIGHT +
      mediaScore * MEDIA_SCORE_WEIGHT +
      tagsScore * TAGS_SCORE_WEIGHT +
      summaryScore * SUMMARY_SCORE_WEIGHT +
      socialsScore * SOCIAL_SCORE_WEIGHT) /
    sumOfWeights

  const percentScore = Math.floor(score * 100)
  return percentScore
}
