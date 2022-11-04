import React from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

const EmptyNotification = () => {
  return (
    <Flex
      mb="8 !important"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="50%"
        mt="12"
        h="280px"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgImage="/images/empty-notification-light-bg.svg"
        _dark={{ bgImage: '/images/empty-notification-dark-bg.svg' }}
      />
      <Flex direction="column">
        <Heading
          fontSize="2xl"
          color="emptyNotificationHeading"
          textAlign="center"
        >
          Get started with your Notification list
        </Heading>
        <Text
          maxW="75%"
          mx="auto"
          fontWeight={500}
          fontSize="md"
          mt="3"
          color="emptyNotificationText"
          textAlign="center"
        >
          Search for wikis you would love to get updates on and add them to your
          list.
        </Text>
      </Flex>
    </Flex>
  )
}

export default EmptyNotification
