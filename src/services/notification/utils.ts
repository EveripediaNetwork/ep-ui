import { store } from '@/store/store'
import { ActivityCardDetails } from '@/types/Wiki'
import { useEffect, useState } from 'react'
import { useGetAllWikiSubscriptionQuery } from '.'
import { getWikiActivityCardDetails } from '../wikis'

export const useWikiSubscriptions = (userId: string) => {
  const {
    data: wikiSubs,
    error,
    isLoading,
  } = useGetAllWikiSubscriptionQuery(userId)

  const [wikiSubscriptions, setWikiSubscriptions] = useState<
    ActivityCardDetails[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      if (!wikiSubs) return
      wikiSubs.forEach(async wikiSub => {
        const { data: wiki } = await store.dispatch(
          getWikiActivityCardDetails.initiate(wikiSub.auxiliaryId),
        )
        if (wiki) setWikiSubscriptions(prev => [...prev, wiki])
      })
    }

    fetchData()
  }, [wikiSubs])

  return { wikiSubscriptions, error, isLoading }
}
