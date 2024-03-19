import {
  getCategoriesByTitle,
  getWikisByTitle,
  getAccountsByTitle,
} from '@/services/search'
import { getTagWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { WikiPreview } from '@everipedia/iq-utils'
import { debounce } from 'debounce'

import { useEffect, useState } from 'react'
import { logEvent } from '@/utils/googleAnalytics'
import { getEventByBlockchain, getEventsByTags } from '../event'

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
  wikis: WikiPreview[]
  categories: CategoryDataType[]
  accounts: Account[]
}

export type SearchItem = keyof typeof SEARCH_TYPES

export const SEARCH_TYPES = {
  WIKI: 'WIKI',
  CATEGORY: 'CATEGORY',
  ACCOUNT: 'ACCOUNT',
} as const

export const fillType = (
  item: WikiPreview | CategoryDataType | Account,
  type: SearchItem,
) => {
  return { ...item, type }
}

export const fetchFilteredEventList = async (
  ids: string[],
  startDate?: string,
  endDate?: string,
) => {
  const { data } = await store.dispatch(
    getEventsByTags.initiate({ tagIds: ids, startDate, endDate }),
  )
  return data
}

export const fetchEventByBlockchain = async (
  blockchain: string,
  startDate?: string,
  endDate?: string,
) => {
  const { data } = await store.dispatch(
    getEventByBlockchain.initiate({ blockchain, startDate, endDate }),
  )
  return data
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
    ]).then((res) => {
      const [wikis = [], categories = [], accounts = []] = res
      cb({ wikis, categories, accounts })
    })
  },
  500,
)

export const useNavSearch = () => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [results, setResults] = useState<Results>({
    wikis: [],
    categories: [],
    accounts: [],
  })

  useEffect(() => {
    if (query && query.length >= 3) {
      setIsLoading(true)
      debouncedFetchResults(query, (res) => {
        if (!res.accounts && !res.wikis && !res.categories) {
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
