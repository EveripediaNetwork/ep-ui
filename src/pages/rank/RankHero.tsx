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
        fontSize={{ md: '4xl', base: '2xl', xl: '5xl' }}
        mb={{ base: 4 }}
        fontWeight={'600'}
      >
        Wiki Rank by Market Cap
      </Heading>
      <Text
        fontSize={{ xl: 'xl', md: 'lg', base: 'md' }}
        textAlign="center"
        maxW={'743px'}
      >
        A list of wikis in different categories, including DeFi, NFTs, DAOs, and
        Cryptocurrencies, ranked based on the global market cap respectively.
      </Text>
    </Flex>
  )
}

export default RankHero
