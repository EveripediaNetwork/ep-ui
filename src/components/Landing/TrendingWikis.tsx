import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
import TrendingCard from './TrendingCard'
import { FeaturedWikis } from './FeturedWikis'

const TrendingWikis = ({
  drops = [],
  recent = [],
  featuredWikis = [],
}: {
  drops?: Wiki[]
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
        <TrendingCard
          title="Trending Wikis"
          icon={RiBarChartFill}
          wikis={drops}
        />
        <TrendingCard title="Recent Edits" icon={RiTimeFill} wikis={recent} />
        <FeaturedWikis featuredWikis={featuredWikis} />
      </Flex>
    </Box>
  )
}

export default TrendingWikis
