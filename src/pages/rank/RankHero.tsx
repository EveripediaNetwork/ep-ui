import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

const RankHero = () => {
  return (
    <Flex
      py={{ md: 20, base: 24 }}
      w={{ lg: '80%', md: '80%', base: '95%', '2xl': '80%' }}
      mx="auto"
      flexDir="column"
      alignItems="center"
    >
      <Heading
        fontSize={{ lg: '6xl', md: '4xl', base: '2xl', '2xl': '7xl' }}
        mb={{ base: 6 }}
      >
        RANKING BY MARKETCAP
      </Heading>
      <Text
        mt={{ md: 4 }}
        fontSize={{ '2xl': '2xl', md: 'xl', base: 'md' }}
        textAlign="center"
      >
        A list of wikis in different categories, including Defi, NFTs, DAOs and
        Cryptocurencies, ranked based on the global marketcap respectively.
      </Text>
    </Flex>
  )
}

export default RankHero
