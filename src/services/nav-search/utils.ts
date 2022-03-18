import {
  getCategoriesByTitle,
  getWikisByTitle,
  WikiTitle,
} from '@/services/nav-search'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'

type Results = {
  articles: WikiTitle[]
  categories: Category[]
}

const fetchWikisList = async (query: string) => {
  const { data } = await store.dispatch(getWikisByTitle.initiate(query))
  return data
}
const fetchCategoriesList = async (query: string) => {
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

  // const [wikis, setWikis] = useState<WikiTitle[] | null>(null)
  // const [categories, seCategories] = useState<Category[] | null>(null)
  // const results = {
  //   articles: wikis,
  //   categories,
  // }

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
