import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getRunningOperationPromises as getWikisRunningOperationPromises,
} from '@/services/wikis'
import { store } from '@/store/store'
import { Wiki } from '@/types/Wiki'
import Hero from '@/components/Landing/Hero'
import TrendingWikis from '@/components/Landing/TrendingWikis'
import CategoriesList from '@/components/Landing/CategoriesList'
import {
  getCategories,
  getRunningOperationPromises as getCategoriesRunningOperationPromises,
} from '@/services/categories'
import {
  getTags,
  getRunningOperationPromises as getTagsRunningOperationPromises,
} from '@/services/tags'
import { Category } from '@/types/CategoryDataTypes'
import DiscoverMore from '@/components/Landing/DiscoverMore'

interface HomePageProps {
  promotedWikis: Wiki[]
  categories: Category[]
  popularTags: { id: string }[]
}

export const Index = ({
  promotedWikis,
  categories,
  popularTags,
}: HomePageProps) => {
  return (
    <Flex direction="column" mx="auto" w="full" pt={{ base: 6, lg: 20 }}>
      <Hero wiki={promotedWikis && promotedWikis[0]} />
      <Box
        _dark={{
          bgImage: '/images/homepage-bg-dark.png',
        }}
        bgImage="/images/homepage-bg-white.png"
      >
        <TrendingWikis drops={promotedWikis} />
        <CategoriesList categories={categories} />
      </Box>
      <DiscoverMore tagsData={popularTags} />
    </Flex>
  )
}

export async function getServerSideProps() {
  const { data: promotedWikis } = await store.dispatch(
    getPromotedWikis.initiate(),
  )
  const { data: categories } = await store.dispatch(getCategories.initiate())

  const { data: tagsData } = await store.dispatch(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
  )

  await Promise.all(getWikisRunningOperationPromises())
  await Promise.all(getCategoriesRunningOperationPromises())
  await Promise.all(getTagsRunningOperationPromises())

  return {
    props: {
      promotedWikis: promotedWikis || [],
      categories: categories || [],
      popularTags: tagsData || [],
    },
  }
}

export default Index
