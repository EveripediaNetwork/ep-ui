import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const RankHero = () => (
  <Flex
    pt={{ lg: 16 }}
    pb={{ lg: 48 }}
    w="85%"
    mx="auto"
    flexDir="column"
    alignItems="center"
  >
    <Heading fontSize={{ lg: '7xl' }}>RANKING BY MARKETCAP</Heading>
    <Text fontSize={{ lg: '2xl' }} color="#1A202C" textAlign="center">
      A list of wikis in different categories, including Defi, NFTs, DAOs and
      Cryptocurencies, ranked based on the global marketcap respectively.
    </Text>
  </Flex>
)
