import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { RiTimeFill } from 'react-icons/ri'
import TrendingCard from './TrendingCard'
import { FeaturedWikis } from './FeaturedWikis'
import TrendingWikiCard from './TrendingWikiCard'

const TrendingWikis = ({
  trending = [],
  recent = [],
  featuredWikis = [],
}: {
  trending?: Wiki[]
  recent?: Wiki[]
  featuredWikis?: Wiki[]
}) => {
  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      pb={{ base: 5, md: 20 }}
      pt={0}
      textAlign="center"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        maxW={{ base: '403px', md: 'fit-content' }}
        mx="auto"
        flexWrap="wrap"
        gap={4}
        minH="500px"
      >
        <TrendingWikiCard trending={trending} />
        <TrendingCard title="Recent Edits" icon={RiTimeFill} wikis={recent} />
        <FeaturedWikis featuredWikis={featuredWikis} />
      </Flex>
    </Box>
  )
}

export default TrendingWikis
