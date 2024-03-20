import { Wiki } from '@everipedia/iq-utils'
import { CreateToastFnReturn } from '@chakra-ui/toast'
import { MEDIA_POST_DEFAULT_ID, WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { getWordCount } from '../DataTransform/getWordCount'
import { isVerifiedContentLinks } from '../textUtils'

type TReferenceObject = {
  id: string
  url: string
  description: string
  timestamp: number
}

const MINIMUM_WORDS = 100

const checkErrors = (
  toast: CreateToastFnReturn,
  conditionErrorPair: [string, () => boolean][],
) => {
  let isErrorFree = true
  conditionErrorPair.forEach(([errorText, condition]) => {
    if (isErrorFree && condition()) {
      toast({
        title: errorText,
        status: 'error',
        duration: 3000,
      })
      isErrorFree = false
    }
  })
  return isErrorFree
}

const isMediaUploading = (wiki: Wiki) =>
  !wiki.media?.every((m) => !m.id.endsWith(MEDIA_POST_DEFAULT_ID))

const isEventUrlPresent = (wiki: Wiki) => {
  let isEventUrlValid = false

  if (wiki.tags.some((tag) => tag.id === 'Events')) {
    const data =
      wiki.metadata.find((meta) => meta.id === 'references')?.value || ''

    const references: TReferenceObject[] = JSON.parse(data)

    isEventUrlValid = references.some(
      (item) => item.description.toLowerCase() === 'event link',
    )
      ? false
      : true
  }
  return isEventUrlValid
}

const isEventDatePresent = (wiki: Wiki) => {
  let isEventDate = false
  if (wiki.tags.some((tag) => tag.id === 'Events')) {
    isEventDate = wiki.events?.length === 0
  }
  return isEventDate
}

const isSummaryExceedsLimit = (wiki: Wiki) =>
  !!(wiki.summary && wiki.summary.length > WIKI_SUMMARY_LIMIT)

const isCitationInvalid = (wiki: Wiki) => {
  return (
    wiki.metadata.find((meta) => meta.id === 'references')?.value.length ===
      0 ||
    !wiki.metadata.find((meta) => meta.id === 'references') ||
    !wiki.metadata.find((meta) => meta.id === 'references')?.value
  )
}

const NO_WIKI_TITLE_ERROR = 'Add a Title at the top for this Wiki to continue'
const TITLE_EXCEEDS_LIMIT_ERROR = 'Title should be less than 60 characters'
const NO_WIKI_CONTENT_ERROR = 'Add a Content section to continue'
const SUMMARY_EXCEEDS_LIMIT_ERROR = `Summary exceeds maximum limit of ${WIKI_SUMMARY_LIMIT}`
const NO_WIKI_IMAGES_ERROR = 'Add a main image on the right column to continue'
const NO_WIKI_CATEGORIES_ERROR = 'Add one category to continue'
const MEDIA_UPLOADING_ERROR = 'Some of media are still uploading, please wait'
const EXTERNAL_LINKS_ERROR = 'Please remove all external links from the content'
const NO_CITATION_EROR = 'Please add at least one citation'
const NO_EVENT_URL_ERROR = `Please add a citation for the event with description "Event Link" `
const NO_EVENT_ERROR = `Please open the "Edit Wiki Details Modal" and enter a valid event date`
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
    [NO_CITATION_EROR, () => isCitationInvalid(wiki)],
    [NO_EVENT_URL_ERROR, () => isEventUrlPresent(wiki)],
    [NO_EVENT_ERROR, () => isEventDatePresent(wiki)],
  ])
}
