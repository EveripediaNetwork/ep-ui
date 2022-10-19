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
import LeaderBoard from '@/components/Landing/Leaderboard'
import {
  getLeaderboard,
  getRunningOperationPromises as getLeaderboardRunningOperationPromises,
  LeaderBoardType,
} from '@/services/editor'
import { sortLeaderboards } from '@/utils/leaderboard.utils'

interface HomePageProps {
  promotedWikis: Wiki[]
  categories: Category[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
}

export const Index = ({
  promotedWikis,
  categories,
  popularTags,
  leaderboards,
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
        <TrendingWikis drops={promotedWikis && promotedWikis.slice(1)} />
        <CategoriesList categories={categories} />
      </Box>
      {leaderboards.length > 0 && <LeaderBoard leaderboards={leaderboards} />}
      <DiscoverMore tagsData={popularTags} />
    </Flex>
  )
}

export async function getStaticProps() {
  const { data: promotedWikis, error: promotedWikisError } =
    await store.dispatch(getPromotedWikis.initiate())
  const { data: categories, error: categoriesError } = await store.dispatch(
    getCategories.initiate(),
  )
  const { data: leaderboard, error: leaderboardError } = await store.dispatch(
    getLeaderboard.initiate(),
  )
  const { data: tagsData, error: tagsDataError } = await store.dispatch(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
  )
  await Promise.all(getWikisRunningOperationPromises())
  await Promise.all(getCategoriesRunningOperationPromises())
  await Promise.all(getLeaderboardRunningOperationPromises())
  await Promise.all(getTagsRunningOperationPromises())
  if (
    promotedWikisError ||
    categoriesError ||
    tagsDataError ||
    leaderboardError
  ) {
    throw new Error(
      `Error fetching data. the error is: ${{
        promotedWikisError,
        categoriesError,
        tagsDataError,
      }}`,
    )
  }
  const sortedleaderboards = sortLeaderboards(leaderboard)
  return {
    props: {
      promotedWikis: promotedWikis || [],
      categories: categories || [],
      popularTags: tagsData || [],
      leaderboards: sortedleaderboards || [],
    },
  }
}

export default Index
