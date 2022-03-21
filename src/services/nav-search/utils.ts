import { getWikisByTitle, WikiTitle } from '@/services/nav-search'
import { store } from '@/store/store'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'

const fetchList = async (query: string, cb: (data: WikiTitle[]) => void) => {
  const { data } = await store.dispatch(getWikisByTitle.initiate(query))
  cb(data || [])
}

export const debouncedFetchData = debounce(
  (query: string, cb: (data: WikiTitle[]) => void) => {
    fetchList(query, cb)
  },
  500,
)

export const useNavSearch = () => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [wikis, setWikis] = useState<WikiTitle[] | null>(null)
  const results = {
    articles: wikis,
  }

  useEffect(() => {
    if (query && query.length >= 3) {
      setIsLoading(true)
      debouncedFetchData(query, res => {
        setIsLoading(false)
        setWikis(res)
      })
    }
  }, [query])

  return { query, setQuery, isLoading, results }
}
