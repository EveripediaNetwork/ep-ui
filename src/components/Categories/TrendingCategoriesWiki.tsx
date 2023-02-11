import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { RiStarFill } from 'react-icons/ri'
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
        icon={RiStarFill}
        title={`Popular ${categoryType} Wikis`}
        wikis={trending}
      />
      <TrendingCategoryCard
        icon={RiStarFill}
        title={`New ${categoryType} Wikis`}
        wikis={newWikis}
        type="new"
      />
    </SimpleGrid>
  )
}

export default TrendingCategoriesWiki
