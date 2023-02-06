import { Wiki } from '@everipedia/iq-utils'
import { CreateToastFnReturn } from '@chakra-ui/toast'
import { MEDIA_POST_DEFAULT_ID, WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { getWordCount } from '../DataTransform/getWordCount'
import { MINIMUM_WORDS, isVerifiedContentLinks } from './createWiki'

export const isValidWiki = (toast: CreateToastFnReturn, wiki: Wiki) => {
  if (!wiki.title) {
    toast({
      title: `Add a Title at the top for this Wiki to continue `,
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (wiki.title.length > 60) {
    toast({
      title: `Title should be less than 60 characters`,
      status: 'error',
      duration: 3000,
    })
    return false
  }

  const words = getWordCount(wiki.content || '')

  if (words < MINIMUM_WORDS) {
    toast({
      title: `Add a minimum of ${MINIMUM_WORDS} words in the content section to continue, you have written ${words}`,
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (!isVerifiedContentLinks(wiki.content)) {
    toast({
      title: 'Please remove all external links from the content',
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (!wiki.images?.length) {
    toast({
      title: 'Add a main image on the right column to continue',
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (wiki.categories.length === 0) {
    toast({
      title: 'Add one category to continue',
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (!wiki.media?.every(m => !m.id.endsWith(MEDIA_POST_DEFAULT_ID))) {
    toast({
      title: 'Some of media are still uploading, please wait',
      status: 'error',
      duration: 3000,
    })
    return false
  }

  if (wiki.summary && wiki.summary.length > WIKI_SUMMARY_LIMIT) {
    toast({
      title: `Summary exceeds maximum limit of ${WIKI_SUMMARY_LIMIT}`,
      status: 'error',
      duration: 3000,
    })
  }
  return true
}
