import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
import { TrendingData } from '@/types/Home'
import TrendingCard from './TrendingCard'
import { FeaturedWikis } from './FeaturedWikis'
import { useTranslation } from 'react-i18next'

const TrendingWikis = ({
  trending,
  recent = [],
  featuredWikis = [],
}: {
  trending?: TrendingData
  recent?: Wiki[]
  featuredWikis?: Wiki[]
}) => {
  const { t } = useTranslation()
  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      pb={{ base: 16, md: 20, lg: 24 }}
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
          title={t('trendingWikisTitle')}
          icon={RiBarChartFill}
          wikis={trending}
          isTrending
        />
        <TrendingCard title="Recent Edits" icon={RiTimeFill} wikis={recent} />
        <FeaturedWikis featuredWikis={featuredWikis} />
      </Flex>
    </Box>
  )
}

export default TrendingWikis
