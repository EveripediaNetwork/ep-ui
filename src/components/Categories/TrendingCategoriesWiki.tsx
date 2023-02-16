import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
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
  let title

  switch (categoryType) {
    case 'NFTs':
      title = 'NFT'
      break
    case 'Dapps':
      title = 'Dapp'
      break
    case 'Cryptocurrencies':
      title = 'Cryptocurrency'
      break
    case 'Exchanges':
      title = 'Exchange'
      break
    case 'DAOs':
      title = 'DAO'
      break
    default:
      title = categoryType
  }

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
        title={`Popular ${title} Wikis`}
        wikis={trending}
      />
      <TrendingCategoryCard
        icon={RiTimeFill}
        title={`New ${title} Wikis`}
        wikis={newWikis}
      />
    </SimpleGrid>
  )
}

export default TrendingCategoriesWiki
