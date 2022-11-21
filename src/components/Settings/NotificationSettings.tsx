import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, VStack, Checkbox, Heading, Text } from '@chakra-ui/react'
import { NotificationChannelsData } from '@/data/NotificationChannelsData'
import { ProfileNotifications } from '@/types/ProfileType'
import { logEvent } from '@/utils/googleAnalytics'
import SearchWikiNotifications from '@/components/Settings/Notification/SearchWikiNotifications'
import SearchWikiNotificationsResult from '@/components/Settings/Notification/SearchWikiNotificationsResult'
import { useGetAllWikiSubscriptionQuery } from '@/services/notification'
import { WikiNotificationsRecommendations } from './Notification/NotificationWikiRecomendations'
import NotificationCard from '../Notification/NotificationCard'
import EmptyNotification from './Notification/EmptyNotification'
import { LoadingSkeleton } from '../Activity/LoadingSkeleton'

interface NotificationSettingBoxProps {
  id: string
  title: string
  description: string
  isChecked?: boolean
  setNotificationPrefs: React.Dispatch<
    React.SetStateAction<typeof NotificationChannelsData>
  >
}

const NotificationSettingBox = ({
  id,
  title,
  description,
  isChecked,
  setNotificationPrefs,
}: NotificationSettingBoxProps) => {
  return (
    <Box>
      <Checkbox
        name={id}
        isChecked={isChecked}
        onChange={() => {
          setNotificationPrefs(prev =>
            prev.map(item => {
              if (item.id === id) {
                return { ...item, isChecked: !item.isChecked }
              }
              return item
            }),
          )
        }}
        colorScheme="pink"
        size="lg"
      >
        <VStack align="left" spacing={2} ml={4}>
          <Heading fontSize="md">{title}</Heading>
          <Text opacity={0.8} fontSize="md">
            {description}
          </Text>
        </VStack>
      </Checkbox>
    </Box>
  )
}

interface NotificationSettingsProps {
  address: string
  savedNotificationPrefs?: ProfileNotifications
}

const NotificationSettings = ({
  address,
  savedNotificationPrefs,
}: NotificationSettingsProps) => {
  const { data: wikiSubscriptionsData, isLoading } =
    useGetAllWikiSubscriptionQuery(address)
  const route = useRouter()
  const [notificationPrefs, setNotificationPrefs] = useState<
    typeof NotificationChannelsData
  >(NotificationChannelsData)

  const wikiSubscriptions = useMemo(
    () => wikiSubscriptionsData?.map(item => item.wiki) ?? [],
    [wikiSubscriptionsData],
  )

  useEffect(() => {
    const notificationChannels = NotificationChannelsData.map(channel => ({
      ...channel,
      isChecked: savedNotificationPrefs
        ? savedNotificationPrefs[channel.id]
        : channel.isChecked,
    }))
    setNotificationPrefs(notificationChannels)
  }, [savedNotificationPrefs])

  const handleNotificationSettingsSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!address) return
    const checkboxes = Array.from(
      e.currentTarget.querySelectorAll(
        'input[type="checkbox"]',
      ) as unknown as Array<HTMLInputElement>,
    )

    let data = {}
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        data = { ...data, [checkbox.title]: checkbox.checked }
      }
    })
    logEvent({
      action: 'NOTIFICATION_SETTINGS',
      label: JSON.stringify(data),
      value: 1,
      category: 'notification_options',
    })
  }

  return (
    <>
      <form onSubmit={handleNotificationSettingsSave}>
        <VStack maxW="3xl" align="left">
          {notificationPrefs.map(n => (
            <NotificationSettingBox
              key={n.id}
              id={n.id}
              title={n.title}
              description={n.description}
              setNotificationPrefs={setNotificationPrefs}
              isChecked={n.isChecked}
            />
          ))}
        </VStack>
      </form>
      <SearchWikiNotifications />
      {route.query?.q && <SearchWikiNotificationsResult />}
      {!route.query?.q && (
        <>
          {isLoading && <LoadingSkeleton />}
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
