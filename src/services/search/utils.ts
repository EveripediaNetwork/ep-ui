import { TagsSuggestions } from '@/data/TagsSuggestions'
import {
  getCategoriesByTitle,
  getWikisByTitle,
  getAccountsByTitle,
} from '@/services/search'
import { getTagWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { Tag, WikiPreview } from '@/types/Wiki'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { logEvent } from '@/utils/googleAnalytics'

export type Account = {
  id: string
  username: string
  bio: string
  avatar: string
}
type AccountArgs = {
  id: string
  username: string
}
type Results = {
  articles: WikiPreview[]
  categories: Category[]
  accounts: Account[]
}

export type SearchItem = keyof typeof SEARCH_TYPES

export const SEARCH_TYPES = {
  ARTICLE: 'ARTICLE',
  CATEGORY: 'CATEGORY',
  ACCOUNT: 'ACCOUNT',
} as const

export const fillType = (
  item: WikiPreview | Category | Account,
  type: SearchItem,
) => {
  return { ...item, type }
}

export const fetchWikisList = async (query: string) => {
  const { data } = await store.dispatch(getWikisByTitle.initiate(query))
  const { data: tagsData } = await store.dispatch(
    getTagWikis.initiate({ id: query }),
  )
  return [...(data || []), ...(tagsData || [])]
}
export const fetchCategoriesList = async (query: string) => {
  const { data } = await store.dispatch(getCategoriesByTitle.initiate(query))
  return data
}

export const fetchAccountsList = async (query: AccountArgs) => {
  const { data } = await store.dispatch(getAccountsByTitle.initiate(query))
  return data
}

const debouncedFetchResults = debounce(
  (query: string, cb: (data: Results) => void) => {
    Promise.all([
      fetchWikisList(query),
      fetchCategoriesList(query),
      fetchAccountsList({ id: query, username: query }),
    ]).then(res => {
      const [articles = [], categories = [], accounts = []] = res
      cb({ articles, categories, accounts })
    })
  },
  500,
)

export const useNavSearch = () => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [results, setResults] = useState<Results>({
    articles: [],
    categories: [],
    accounts: [],
  })

  useEffect(() => {
    if (query && query.length >= 3) {
      setIsLoading(true)
      debouncedFetchResults(query, res => {
        if (!res.accounts && !res.articles && !res.categories) {
          logEvent({
            action: 'SEARCH_NO_RESULTS',
            label: query,
            category: 'search_tag',
            value: 1,
          })
        }
        setResults(res)
        setIsLoading(false)
      })
    }
  }, [query])

  return { query, setQuery, isLoading, results }
}

export const useTagSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tag[]>([])

  // get all tags from TagsSuggestions
  const tags = Object.values(TagsSuggestions).flat()
  const fuse = new Fuse(tags, {
    threshold: 0.3,
  })

  const decorateAndLimit = (res: Fuse.FuseResult<string>[]) => {
    return res
      .map(tag => {
        return { id: tag.item }
      })
      .slice(0, 6)
  }
  useEffect(() => {
    if (query && query.length >= 1) {
      const res = decorateAndLimit(fuse.search(query))
      setResults(res)
    } else {
      setResults([])
    }
  }, [query])

  return { query, setQuery, results }
}
