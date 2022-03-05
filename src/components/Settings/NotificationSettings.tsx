import React from 'react'
import { Box, VStack, Checkbox, Heading, Text, Button } from '@chakra-ui/react'

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
    <Checkbox colorScheme="pink" defaultChecked size="lg">
      <VStack align="left" spacing={2} ml={4}>
        <Heading fontSize="md">{title}</Heading>
        <Text opacity={0.8} fontSize="md">
          {description}
        </Text>
      </VStack>
    </Checkbox>
  </Box>
)

const NotificationSettings = () => (
  <Box>
    <VStack maxW="3xl" align="left" borderWidth="1px" borderRadius="md">
      <NotificationSettingBox
        title="Everipedia NewsLetter"
        description="Occasional updates from the Everipedia team"
      />
      <NotificationSettingBox
        title="Wiki of the Day"
        description="Get a wiki page recommendation everyday for you to read"
      />
      <NotificationSettingBox
        title="Wiki of the Month"
        description="Get a wiki page recommendation every month for you to read"
      />
      <NotificationSettingBox
        title="Wiki of the Year"
        description="Get a wiki page recommendation every year for you to read"
      />
      <NotificationSettingBox
        title="Comment Notifications"
        description="Get notified when someone comments on your wiki page edit"
        isLast
      />
    </VStack>
    <Button mt={8} size="lg">
      Save
    </Button>
  </Box>
)

export default NotificationSettings
