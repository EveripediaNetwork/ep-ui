import React, { FormEvent, useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Checkbox,
  Heading,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react'
import { NotificationChannelsData } from '@/data/NotificationChannelsData'
import { usePostUserProfileMutation } from '@/services/profile'
import { ProfileNotifications } from '@/types/ProfileType'
import NotificationInfo from '@/components/Settings/NotificationInfo'
import { logEvent } from '@/utils/googleAnalytics'

interface NotificationSettingBoxProps {
  id: string
  title: string
  description: string
  isLast?: boolean
  isChecked?: boolean
  setNotificationPrefs: React.Dispatch<
    React.SetStateAction<typeof NotificationChannelsData>
  >
}

const NotificationSettingBox = ({
  id,
  title,
  description,
  isLast,
  isChecked,
  setNotificationPrefs,
}: NotificationSettingBoxProps) => {
  return (
    <Box p={4} borderBottomWidth={isLast ? 0 : '1px'}>
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

  const [notificationPrefs, setNotificationPrefs] = useState<
    typeof NotificationChannelsData
  >(NotificationChannelsData)

  const [openSwitch, setOpenSwitch] = useState(false)

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
    setOpenSwitch(true)
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
        <VStack maxW="3xl" align="left" borderWidth="1px" borderRadius="md">
          {notificationPrefs.map((n, i) => (
            <NotificationSettingBox
              key={n.id}
              id={n.id}
              title={n.title}
              description={n.description}
              isLast={NotificationChannelsData.length - 1 === i}
              setNotificationPrefs={setNotificationPrefs}
              isChecked={n.isChecked}
            />
          ))}
        </VStack>
        <Button type="submit" mt={8} size="lg">
          Save
        </Button>
      </form>
      <NotificationInfo
        openSwitch={openSwitch}
        setOpenSwitch={state => setOpenSwitch(state)}
      />
    </>
  )
}

export default NotificationSettings
