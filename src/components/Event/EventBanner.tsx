import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const EventBanner = () => {
  return (
    <Flex
      flexDirection={'column'}
      w={{ md: '80%', base: '95%' }}
      mx="auto"
      py={'24'}
      alignItems="center"
    >
      <Text
        fontSize={{ xl: 'md', base: 'sm' }}
        textAlign="center"
        color={'brand.500'}
      >
        Events
      </Text>
      <Heading
        fontSize={{ md: '4xl', base: '2xl', xl: '5xl' }}
        mb={4}
        fontWeight={'600'}
        color={'wikiFlagTextColor'}
        textAlign={'center'}
        maxW={'1050px'}
      >
        Blockchain and cryptocurrency conferences around the world
      </Heading>
      <Text
        fontSize={{ xl: 'lg', base: 'md' }}
        textAlign="center"
        maxW={'986px'}
        color={'homeDescriptionColor'}
      >
        Learn from the industry experts on crypto trends, explore investment
        opportunities, network with potential partners, connect with like-minded
        individuals, and cultivate relationships for future collaborations at
        global blockchain and crypto events and conferences.
      </Text>
    </Flex>
  )
}

export default EventBanner
