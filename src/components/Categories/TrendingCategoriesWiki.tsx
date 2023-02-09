import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { RiStarFill } from 'react-icons/ri'
import TrendingCategoryCard from './TrendingCategoryCard'

const TrendingCategoriesWiki = ({ categoryType }: { categoryType: string }) => {
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
      />
      <TrendingCategoryCard
        icon={RiStarFill}
        title={`New ${categoryType} Wikis`}
      />
    </SimpleGrid>
  )
}

export default TrendingCategoriesWiki
