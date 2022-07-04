import React, { FormEvent } from 'react'
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
import { usePostUserProfileMutation } from '@/services/settings'
import { ProfileNotificationsType } from '@/types/SettingsType'

interface NotificationSettingBoxProps {
  id: string
  title: string
  description: string
  isLast?: boolean
}

const NotificationSettingBox = ({
  id,
  title,
  description,
  isLast,
}: NotificationSettingBoxProps) => (
  <Box p={4} borderBottomWidth={isLast ? 0 : '1px'}>
    <Checkbox name={id} colorScheme="pink" size="lg">
      <VStack align="left" spacing={2} ml={4}>
        <Heading fontSize="md">{title}</Heading>
        <Text opacity={0.8} fontSize="md">
          {description}
        </Text>
      </VStack>
    </Checkbox>
  </Box>
)

const NotificationSettings = () => {
  const toast = useToast()
  const [postUserProfile] = usePostUserProfileMutation()

  const handleNotificationSettingsSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // get all checkboxes from form
    const checkboxes = Array.from(
      e.currentTarget.querySelectorAll(
        'input[type="checkbox"]',
      ) as unknown as Array<HTMLInputElement>,
    )

    // get all the checked and unchecked checkboxes with their names
    let data = {}
    checkboxes.forEach(checkbox => {
      data = { ...data, [checkbox.name]: checkbox.checked }
    })

    // send the data to the server
    postUserProfile({
      profileInfo: { notifications: [data as ProfileNotificationsType] },
    })

    toast({
      title: 'Notification settings saved!',
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <form onSubmit={handleNotificationSettingsSave}>
      <VStack maxW="3xl" align="left" borderWidth="1px" borderRadius="md">
        {NotificationChannelsData.map((n, i) => (
          <NotificationSettingBox
            key={n.id}
            id={n.id}
            title={n.title}
            description={n.description}
            isLast={NotificationChannelsData.length - 1 === i}
          />
        ))}
      </VStack>
      <Button type="submit" mt={8} size="lg">
        Save
      </Button>
    </form>
  )
}

export default NotificationSettings
