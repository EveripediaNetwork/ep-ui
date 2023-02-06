import { Wiki } from '@everipedia/iq-utils'
import { store } from '@/store/store'
import { getIsWikiSlugValid } from '@/services/wikis'
import { slugifyText } from '../textUtils'

export const getWikiSlug = async (wiki: Wiki) => {
  const slug = slugifyText(String(wiki.title))
  const { data: result } = await store.dispatch(
    getIsWikiSlugValid.initiate(slug),
  )
  if (result?.id) return result.id
  return slug
}
