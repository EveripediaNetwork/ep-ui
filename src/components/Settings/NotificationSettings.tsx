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

interface NotificationSettingBoxProps {
  title: string
  description: string
  isLast?: boolean
}

const NotificationSettingBox = ({
  title,
  description,
  isLast,
}: NotificationSettingBoxProps) => (
  <Box p={4} borderBottomWidth={isLast ? 0 : '1px'}>
    <Checkbox name={title} colorScheme="pink" size="lg">
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

  const handleNotificationSettingsSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // get all checkboxes from form
    const checkboxes = Array.from(
      e.currentTarget.querySelectorAll(
        'input[type="checkbox"]',
      ) as unknown as Array<HTMLInputElement>,
    )

    // get all the checked and unchecked checkboxes with their names
    const data = checkboxes.map(checkbox => ({
      name: checkbox.name,
      value: checkbox.checked,
    }))

    // TODO: Send the data to backend
    console.log(data)

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
            key={n.title}
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
