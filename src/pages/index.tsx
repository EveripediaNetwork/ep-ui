import React from 'react'
import { Box, Flex, Heading, chakra, Text } from '@chakra-ui/react'
import { getPromotedWikis, wikiApi } from '@/services/wikis'
import { store } from '@/store/store'
import { Wiki } from '@everipedia/iq-utils'
import Hero from '@/components/Landing/Hero'
import TrendingWikis from '@/components/Landing/TrendingWikis'
import CategoriesList from '@/components/Landing/CategoriesList'
import { categoriesApi, getCategories } from '@/services/categories'
import { getTags, tagsApi } from '@/services/tags'
import { Category } from '@/types/CategoryDataTypes'
import DiscoverMore from '@/components/Landing/DiscoverMore'
import LeaderBoard from '@/components/Landing/Leaderboard'
import { editorApi, getLeaderboard, LeaderBoardType } from '@/services/editor'
import { sortLeaderboards } from '@/utils/leaderboard.utils'

const RANKING_LIST_LIMIT = 10
const TIME_LIMIT = 60

interface HomePageProps {
  promotedWikis: Wiki[]
  categories: Category[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
}

const HeroAfterFirstVisit = () => {
  return (
    <Box>
      <Heading
        w="full"
        textAlign="center"
        fontSize={{ base: '35', sm: '42', lg: '54' }}
      >
        The World&apos;s Largest
        <chakra.span color="brandLinkColor"> Blockchain & Crypto </chakra.span>
        Encyclopedia
      </Heading>
      <Text textAlign="center" mt="5" fontSize={{ base: 'md', lg: '2xl' }}>
        Start your crypto journey with IQ Wiki! The compass for exploring your
        web3 curiosities.
      </Text>
    </Box>
  )
}

const userFirstVisit = () => {
  const currentDate = new Date()
  if (typeof localStorage === 'undefined') return true

  const firstVisitedString = localStorage.getItem('FIRST_VISITED')

  if (!firstVisitedString) {
    localStorage.setItem('FIRST_VISITED', currentDate.toString())
    return true
  }

  const firstVisited = new Date(firstVisitedString)

  const timeDifference =
    (currentDate.getTime() - firstVisited.getTime()) / (1000 * 60)

  if (timeDifference > TIME_LIMIT) {
    localStorage.removeItem('FIRST_VISITED')
    return true
  }

  return false
}

export const Index = ({
  promotedWikis,
  categories,
  popularTags,
  leaderboards,
  rankings,
}: HomePageProps) => {
  return (
    <Flex direction="column" mx="auto" w="full" pt={{ base: 6, lg: 12 }}>
      {userFirstVisit() ? (
        <Hero wiki={promotedWikis && promotedWikis[0]} />
      ) : (
        <HeroAfterFirstVisit />
      )}
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
  const { data: leaderboard } = await store.dispatch(getLeaderboard.initiate())
  const { data: tagsData, error: tagsDataError } = await store.dispatch(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
  )
  await Promise.all([
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(categoriesApi.util.getRunningQueriesThunk()),
    store.dispatch(tagsApi.util.getRunningQueriesThunk()),
    store.dispatch(editorApi.util.getRunningQueriesThunk()),
  ])

  if (promotedWikisError || categoriesError || tagsDataError) {
    throw new Error(
      `Error fetching data. the error is: ${
        (JSON.stringify(tagsDataError?.message),
        JSON.stringify(categoriesError?.message),
        JSON.stringify(promotedWikisError?.message))
      }`,
    )
  }
  let sortedPromotedWikis: Wiki[] = []
  if (promotedWikis?.length) {
    sortedPromotedWikis = [...promotedWikis]
    sortedPromotedWikis?.sort((a, b) => a.promoted - b.promoted)
  }
  const sortedleaderboards = sortLeaderboards(leaderboard)
  return {
    props: {
      promotedWikis: sortedPromotedWikis || [],
      categories: categories || [],
      popularTags: tagsData || [],
      leaderboards: sortedleaderboards || [],
      rankings: rankings || [],
    },
  }
}

export default Index
