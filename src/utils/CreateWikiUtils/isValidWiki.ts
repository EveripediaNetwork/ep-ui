import { Wiki } from '@everipedia/iq-utils'
import { CreateToastFnReturn } from '@chakra-ui/toast'
import { MEDIA_POST_DEFAULT_ID, WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { getWordCount } from '../DataTransform/getWordCount'
import { MINIMUM_WORDS, isVerifiedContentLinks } from './createWiki'

const checkErrors = (
  toast: CreateToastFnReturn,
  conditionErrorPair: [string, () => boolean][],
) => {
  let isError = false
  conditionErrorPair.forEach(([errorText, condition]) => {
    if (!isError && condition()) {
      toast({
        title: errorText,
        status: 'error',
        duration: 3000,
      })
      isError = true
    }
  })
  return isError
}

const isMediaUploading = (wiki: Wiki) =>
  !wiki.media?.every(m => !m.id.endsWith(MEDIA_POST_DEFAULT_ID))

const isSummaryExceedsLimit = (wiki: Wiki) =>
  !!(wiki.summary && wiki.summary.length > WIKI_SUMMARY_LIMIT)

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
    [NO_WIKI_TITLE_ERROR, () => !wiki.title],
    [TITLE_EXCEEDS_LIMIT_ERROR, () => wiki.title.length > 60],
    [NO_WIKI_CONTENT_ERROR, () => !wiki.content],
    [CONTENT_WORDS_ERROR(words), () => words < MINIMUM_WORDS],
    [EXTERNAL_LINKS_ERROR, () => !isVerifiedContentLinks(wiki.content)],
    [NO_WIKI_IMAGES_ERROR, () => !wiki.images?.length],
    [NO_WIKI_CATEGORIES_ERROR, () => wiki.categories.length === 0],
    [SUMMARY_EXCEEDS_LIMIT_ERROR, () => isSummaryExceedsLimit(wiki)],
    [MEDIA_UPLOADING_ERROR, () => isMediaUploading(wiki)],
  ])
}
