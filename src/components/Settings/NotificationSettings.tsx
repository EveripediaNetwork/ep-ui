import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import SearchWikiNotifications from '@/components/Settings/Notification/SearchWikiNotifications'
import SearchWikiNotificationsResult from '@/components/Settings/Notification/SearchWikiNotificationsResult'
import { useGetAllWikiSubscriptionQuery } from '@/services/notification'
import { WikiNotificationsRecommendations } from './Notification/NotificationWikiRecomendations'
import NotificationCard from '../Notification/NotificationCard'
import EmptyNotification from './Notification/EmptyNotification'
import { LoadingSkeleton } from '../Activity/LoadingSkeleton'

interface NotificationSettingsProps {
  address: string
}

const NotificationSettings = ({ address }: NotificationSettingsProps) => {
  const { data: wikiSubscriptionsData, isLoading } =
    useGetAllWikiSubscriptionQuery(address)
  const route = useRouter()

  const wikiSubscriptions = useMemo(
    () => wikiSubscriptionsData?.map(item => item.wiki) ?? [],
    [wikiSubscriptionsData],
  )

  return (
    <>
      <SearchWikiNotifications />
      {route.query?.q && <SearchWikiNotificationsResult />}
      {!route.query?.q && (
        <>
          {isLoading && <LoadingSkeleton count={3} />}
          {!isLoading &&
            wikiSubscriptions &&
            wikiSubscriptions.length !== 0 &&
            wikiSubscriptions.map(wiki => (
              <NotificationCard
                defaultSubscribed
                brief={wiki?.summary}
                editor={wiki?.user}
                title={wiki?.title}
                WikiImgObj={wiki?.images}
                wikiId={wiki?.id}
                tags={wiki?.tags}
                categories={wiki?.categories}
                lastModTimeStamp={wiki?.updated}
              />
            ))}
          {!isLoading && wikiSubscriptions?.length === 0 && (
            <EmptyNotification />
          )}
          <WikiNotificationsRecommendations address={address} />
        </>
      )}
    </>
  )
}
export default NotificationSettings
