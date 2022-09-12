import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { store } from '@/store/store'
import { useState } from 'react'
import { Dict } from '@chakra-ui/utils'

type Opts = {
  initiator: Dict
  arg: Dict<string>
  defaultLoading?: boolean
}

export const useInfiniteData = <T>(opts: Opts) => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [data, setData] = useState<T[] | []>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(opts.defaultLoading || false)
  const updatedOffset = offset + ITEM_PER_PAGE

  const fetcher = (noOffset?: boolean) => {
    if (loading) return

    const fetchNewWikis = async () => {
      const result = await store.dispatch(
        opts.initiator.initiate({
          ...opts.arg,
          limit: ITEM_PER_PAGE,
          offset: noOffset ? 0 : updatedOffset,
        }),
      )
      const { data: resData } = result

      if (resData && resData.length > 0) {
        setData(prevData => [...prevData, ...resData])
        setOffset(updatedOffset)
        if (resData.length < ITEM_PER_PAGE) setHasMore(false)
        else setHasMore(true)
        if (resData.length === 0) setHasMore(false)
      } else {
        setHasMore(false)
      }
      setLoading(false)
    }

    setLoading(true)
    setTimeout(fetchNewWikis, FETCH_DELAY_TIME)
  }

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
