import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { store } from '@/store/store'
import { useState } from 'react'
import { Dict } from '@chakra-ui/utils'

type Opts = {
  initiator: Dict
  arg: Dict<string>
  noOffset?: boolean
}

export const useInfiniteData = <T>(opts: Opts) => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [data, setData] = useState<T[] | []>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const updatedOffset = offset + ITEM_PER_PAGE

  const fetcher = (noOffset?: boolean) =>
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          opts.initiator.initiate({
            ...opts.arg,
            limit: ITEM_PER_PAGE,
            offset: noOffset ? 0 : updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const { data: resData } = result
          const updatedWiki = [...data, ...resData]
          setData(updatedWiki)
          setOffset(updatedOffset)
          if (resData.length < ITEM_PER_PAGE) {
            setHasMore(false)
            setLoading(false)
          }
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewWikis()
    }, FETCH_DELAY_TIME)

  return {
    fetcher,
    hasMore,
    setHasMore,
    setLoading,
    data,
    setData,
    loading,
    offset,
    setOffset,
  }
}
