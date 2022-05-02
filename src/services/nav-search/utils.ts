import { getCategoriesByTitle, getWikisByTitle } from '@/services/nav-search'
import { getTagWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { WikiPreview } from '@/types/Wiki'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'

type Results = {
  articles: WikiPreview[]
  categories: Category[]
}

export type SearchItem = keyof typeof SEARCH_TYPES

export const SEARCH_TYPES = {
  ARTICLE: 'ARTICLE',
  CATEGORY: 'CATEGORY',
} as const

export const fillType = (item: WikiPreview | Category, type: SearchItem) => {
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

const debouncedFetchResults = debounce(
  (query: string, cb: (data: Results) => void) => {
    Promise.all([fetchWikisList(query), fetchCategoriesList(query)]).then(
      res => {
        const [articles = [], categories = []] = res
        cb({ articles, categories })
      },
    )
  },
  500,
)

export const useNavSearch = () => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [results, setResults] = useState<Results>({
    articles: [],
    categories: [],
  })

  useEffect(() => {
    if (query && query.length >= 3) {
      setIsLoading(true)
      debouncedFetchResults(query, res => {
        setResults(res)
        setIsLoading(false)
      })
    }
  }, [query])

  return { query, setQuery, isLoading, results }
}
