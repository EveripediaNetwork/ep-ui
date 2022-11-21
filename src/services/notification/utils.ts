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

      const wikiSubsDetails = await Promise.all(
        wikiSubs.map(async wikiSub => {
          return store.dispatch(
            getWikiActivityCardDetails.initiate(wikiSub.auxiliaryId),
          )
        }),
      )

      const wikiSubsDetailsData = wikiSubsDetails
        .map(wikiSub => wikiSub.data)
        .filter(Boolean) as ActivityCardDetails[]

      setWikiSubscriptions(wikiSubsDetailsData)
    }
    fetchData()
  }, [wikiSubs])

  return { wikiSubscriptions, error, isLoading }
}

export const useIsWikiSubscribed = (
  wikiId: string | undefined,
  userID: string,
) => {
  const { data } = useGetAllWikiSubscriptionQuery(userID)
  return data?.some(sub => sub.auxiliaryId === wikiId)
}
