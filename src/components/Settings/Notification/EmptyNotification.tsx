import React from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

const EmptyNotification = () => {
  return (
    <Flex
      maxW={{ base: 'full', md: '4xl', '2xl': 'calc(100% - 160px)' }}
      mb="8 !important"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w={{ base: 'full', md: '50%', '2xl': '30%' }}
        mt={{ base: '0', md: '4', lg: '12' }}
        h={{ base: '218px', lg: '280px' }}
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
          maxW={{ base: 'full', md: '75%' }}
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
