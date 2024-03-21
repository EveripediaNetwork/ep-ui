import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
import { TrendingData } from '@/types/Home'
import TrendingCard from './TrendingCard'
import { FeaturedWikis } from './FeaturedWikis'
import { useTranslation } from 'next-i18next'

const TrendingWikis = ({
  trending,
  recent = [],
  featuredWikis = [],
}: {
  trending?: TrendingData
  recent?: Wiki[]
  featuredWikis?: Wiki[]
}) => {
  const { t } = useTranslation('home')

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      pb={{ base: 16, md: 20, lg: 24 }}
      pt={0}
      textAlign="center"
    >
      <Flex
        alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        maxW={{ base: '403px', md: '672px', xl: 'fit-content' }}
        mx="auto"
        flexWrap="wrap"
        gap={4}
        minH="500px"
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          gap={4}
          w={{ base: '100%', md: 'auto' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <TrendingCard
            title={t('trendingWikisTitle')}
            icon={RiBarChartFill}
            wikis={trending}
            isTrending
          />
          <TrendingCard
            title={t('recentEditsTitle')}
            icon={RiTimeFill}
            wikis={recent}
          />
        </Flex>
        <FeaturedWikis featuredWikis={featuredWikis} />
      </Flex>
    </Box>
  )
}

export default TrendingWikis
