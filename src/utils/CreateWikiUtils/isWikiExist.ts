import { getWiki } from '@/services/wikis'
import { store } from '@/store/store'
import { CreateNewWikiSlug, Wiki } from '@everipedia/iq-utils'

export const isWikiExists = async (
  slug: string,
  setExistingWikiData: (data: Wiki) => void,
) => {
  if (slug === CreateNewWikiSlug) return false
  const { data, isError } = await store.dispatch(getWiki.initiate(slug))
  if (isError) return false
  if (data) {
    setExistingWikiData(data)
    return true
  }
  return false
}
