import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  VStack,
  Checkbox,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import { NotificationChannelsData } from '@/data/NotificationChannelsData'
import { usePostUserProfileMutation } from '@/services/profile'
import { ProfileNotifications } from '@/types/ProfileType'
import { logEvent } from '@/utils/googleAnalytics'
import SearchWikiNotifications from '@/components/Settings/Notification/SearchWikiNotifications'
import EmptyNotification from '@/components/Settings/Notification/EmptyNotification'
import SearchWikiNotificationsResult from '@/components/Settings/Notification/SearchWikiNotificationsResult'

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
  address?: string
  savedNotificationPrefs?: ProfileNotifications
}

const NotificationSettings = ({
  address,
  savedNotificationPrefs,
}: NotificationSettingsProps) => {
  const toast = useToast()
  const [postUserProfile] = usePostUserProfileMutation()
  const route = useRouter()

  const [notificationPrefs, setNotificationPrefs] = useState<
    typeof NotificationChannelsData
  >(NotificationChannelsData)

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
    return
    // send the data to the server
    postUserProfile({
      profileInfo: {
        id: address,
        notifications: [data as ProfileNotifications],
      },
    })

    toast({
      title: 'Notification settings saved!',
      status: 'success',
      duration: 1000,
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
      {(route.query?.q?.length ?? 0) >= 3 && <SearchWikiNotificationsResult />}
      {(route.query?.q?.length ?? 0 <= 3) && <EmptyNotification />}
    </>
  )
}

export default NotificationSettings
