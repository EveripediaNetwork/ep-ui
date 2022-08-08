import { TagsByCategory } from '@/data/TagsByCategory'
import { getCategoriesByTitle, getWikisByTitle, getUsernamesByTitle } from '@/services/search'
import { getTagWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { Tag, WikiPreview } from '@/types/Wiki'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export type Username = {
  id: string
  username: string
  bio: string
  avatar: string
}

type Results = {
  articles: WikiPreview[]
  categories: Category[]
  usernames: Username[]
}

export type SearchItem = keyof typeof SEARCH_TYPES

export const SEARCH_TYPES = {
  ARTICLE: 'ARTICLE',
  CATEGORY: 'CATEGORY',
  USERNAME: 'USERNAME',

} as const

export const fillType = (item: WikiPreview | Category | Username, type: SearchItem) => {
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

export const fetchUsernamesList = async (query: string) => {
  const { data } = await store.dispatch(getUsernamesByTitle.initiate(query))
  console.log({data, query})
  return data
}

const debouncedFetchResults = debounce(
  (query: string, cb: (data: Results) => void) => {
    Promise.all([fetchWikisList(query), fetchCategoriesList(query), fetchUsernamesList(query)]).then(
      res => {
        const [articles = [], categories = [], usernames = []] = res
        cb({ articles, categories, usernames })
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
    usernames: [],
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

export const useTagSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tag[]>([])

  // get all tags from TagsByCategory
  const tags = Object.values(TagsByCategory).flat()
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
      const wikiCategories = store.getState().wiki.categories
      // check if category.id is in TagsByCategory keys
      const isCategoryInCategoryList = wikiCategories.some(category =>
        Object.keys(TagsByCategory).includes(category.id),
      )
      if (wikiCategories && isCategoryInCategoryList) {
        // get all tags from wiki categories
        const tagsForWikiCategories = wikiCategories
          .map(category => {
            return TagsByCategory[category.id as keyof typeof TagsByCategory]
          })
          .flat()
        // search tags in tagsFlat with query
        const fuseScoped = new Fuse(tagsForWikiCategories)
        const res = decorateAndLimit(fuseScoped.search(query))
        setResults(res)
      } else {
        const res = decorateAndLimit(fuse.search(query))
        setResults(res)
      }
    } else {
      setResults([])
    }
  }, [query])

  return { query, setQuery, results }
}
