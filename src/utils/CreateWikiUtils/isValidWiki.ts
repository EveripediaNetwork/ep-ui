import { Wiki } from '@everipedia/iq-utils'
import { CreateToastFnReturn } from '@chakra-ui/toast'
import { MEDIA_POST_DEFAULT_ID, WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { getWordCount } from '../DataTransform/getWordCount'
import { MINIMUM_WORDS, isVerifiedContentLinks } from './createWiki'

const isMediaUploading = (wiki: Wiki) =>
  !wiki.media?.every(m => !m.id.endsWith(MEDIA_POST_DEFAULT_ID))

const isSummaryExceedsLimit = (wiki: Wiki) =>
  !!(wiki.summary && wiki.summary.length > WIKI_SUMMARY_LIMIT)

const checkErrors = (
  toast: CreateToastFnReturn,
  conditionErrorPair: [() => boolean, string][],
) => {
  let errorPresence = false
  conditionErrorPair.forEach(([condition, errorText]) => {
    if (condition()) {
      toast({
        title: errorText,
        status: 'error',
        duration: 3000,
      })
      errorPresence = true
    }
  })
  return errorPresence
}

const NO_WIKI_TITLE_ERROR = 'Add a Title at the top for this Wiki to continue'
const TITLE_EXCEEDS_LIMIT_ERROR = `Title should be less than 60 characters`
const NO_WIKI_CONTENT_ERROR = 'Add a Content section to continue'
const SUMMARY_EXCEEDS_LIMIT_ERROR = `Summary exceeds maximum limit of ${WIKI_SUMMARY_LIMIT}`
const NO_WIKI_IMAGES_ERROR = 'Add a main image on the right column to continue'
const NO_WIKI_CATEGORIES_ERROR = 'Add one category to continue'
const MEDIA_UPLOADING_ERROR = 'Some of media are still uploading, please wait'
const EXTERNAL_LINKS_ERROR = 'Please remove all external links from the content'
const CONTENT_WORDS_ERROR = (words: number) =>
  `Add a minimum of ${MINIMUM_WORDS} words in the content section to continue. you have written ${words}`

export const isValidWiki = (toast: CreateToastFnReturn, wiki: Wiki) => {
  const words = getWordCount(wiki.content || '')
  return checkErrors(toast, [
    [() => !wiki.title, NO_WIKI_TITLE_ERROR],
    [() => wiki.title.length > 60, TITLE_EXCEEDS_LIMIT_ERROR],
    [() => !wiki.content, NO_WIKI_CONTENT_ERROR],
    [() => words < MINIMUM_WORDS, CONTENT_WORDS_ERROR(words)],
    [() => !isVerifiedContentLinks(wiki.content), EXTERNAL_LINKS_ERROR],
    [() => !wiki.images?.length, NO_WIKI_IMAGES_ERROR],
    [() => wiki.categories.length === 0, NO_WIKI_CATEGORIES_ERROR],
    [() => isSummaryExceedsLimit(wiki), SUMMARY_EXCEEDS_LIMIT_ERROR],
    [() => isMediaUploading(wiki), MEDIA_UPLOADING_ERROR],
  ])
}
