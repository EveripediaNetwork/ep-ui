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

      console.log(wikiSubs)

      // TODO: Check this is not working
      const wikiSubsDetails = await Promise.all(
        wikiSubs.wikiSubscriptions.map(async wikiSub => {
          return store.dispatch(
            getWikiActivityCardDetails.initiate(wikiSub.auxiliaryId),
          )
        }),
      )

      console.log(wikiSubsDetails)

      const wikiSubsDetailsData = wikiSubsDetails
        .map(wikiSub => wikiSub.data)
        .filter(Boolean) as ActivityCardDetails[]

      console.log(wikiSubsDetailsData)

      setWikiSubscriptions(wikiSubsDetailsData)
    }
    fetchData()
  }, [wikiSubs])

  return { wikiSubscriptions, error, isLoading }
}
