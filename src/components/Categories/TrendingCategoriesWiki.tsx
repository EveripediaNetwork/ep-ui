import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
import { manualTranformCategoryTitle } from '@/utils/DataTransform/changeCategoryTitle'
import { Wiki } from '@everipedia/iq-utils'
import TrendingCategoryCard from './TrendingCategoryCard'

const TrendingCategoriesWiki = ({
  categoryType,
  trending,
  newWikis,
}: {
  categoryType: string
  trending: Wiki[]
  newWikis: Wiki[]
}) => {
  return (
    <SimpleGrid
      width={{ base: '90%', lg: 'min(80%, 1300px)' }}
      mx="auto"
      my={{ base: '10', md: '16' }}
      gridTemplateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(2, 1fr)' }}
      gap="5"
    >
      <TrendingCategoryCard
        icon={RiBarChartFill}
        title={`Popular ${manualTranformCategoryTitle(categoryType)} Wikis`}
        wikis={trending}
      />
      <TrendingCategoryCard
        icon={RiTimeFill}
        title={`New ${manualTranformCategoryTitle(categoryType)} Wikis`}
        wikis={newWikis}
      />
    </SimpleGrid>
  )
}

export default TrendingCategoriesWiki
