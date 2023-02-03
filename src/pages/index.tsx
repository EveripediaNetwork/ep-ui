import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { getPromotedWikis, getWikis, wikiApi } from '@/services/wikis'
import { store } from '@/store/store'
import { Wiki } from '@everipedia/iq-utils'
import TrendingWikis from '@/components/Landing/TrendingWikis'
import CategoriesList from '@/components/Landing/CategoriesList'
import { categoriesApi, getCategories } from '@/services/categories'
import { getTags, tagsApi } from '@/services/tags'
import { Category } from '@/types/CategoryDataTypes'
import DiscoverMore from '@/components/Landing/DiscoverMore'
import LeaderBoard from '@/components/Landing/Leaderboard'
import { editorApi, getLeaderboard, LeaderBoardType } from '@/services/editor'
import { sortLeaderboards } from '@/utils/leaderboard.utils'
import { RankCardType } from '@/types/RankDataTypes'
import RankingList from '@/components/Landing/RankingList'
import { nftLisitngAPI } from '@/services/nftlisting'
import { getNFTRanking, getTokenRanking, rankingAPI } from '@/services/ranking'
import { Hero } from '@/components/Landing/Hero'

const RANKING_LIST_LIMIT = 10

interface HomePageProps {
  promotedWikis: Wiki[]
  recentWikis: Wiki[]
  categories: Category[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
}

export const Index = ({
  promotedWikis,
  recentWikis,
  categories,
  popularTags,
  leaderboards,
  rankings,
}: HomePageProps) => {
  return (
    <Flex direction="column" mx="auto" w="full" pt={{ base: 6, lg: 12 }}>
      <Hero />
      <Box
        _dark={{
          bgImage: '/images/backgrounds/homepage-bg-dark.png',
        }}
        bgImage="/images/backgrounds/homepage-bg-white.png"
      >
        <TrendingWikis
          drops={promotedWikis && promotedWikis.slice(0, 5)}
          recent={recentWikis && recentWikis.slice(0, 5)}
          featuredWikis={promotedWikis && promotedWikis}
        />
        <RankingList rankings={rankings} />
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
  const { data: recent, error: recentError } = await store.dispatch(
    getWikis.initiate(),
  )

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

  const { data: NFTsList } = await store.dispatch(
    getNFTRanking.initiate({
      kind: 'NFT',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )

  const { data: TokensList } = await store.dispatch(
    getTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )

  await Promise.all([
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(categoriesApi.util.getRunningQueriesThunk()),
    store.dispatch(tagsApi.util.getRunningQueriesThunk()),
    store.dispatch(editorApi.util.getRunningQueriesThunk()),
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(nftLisitngAPI.util.getRunningQueriesThunk()),
    store.dispatch(rankingAPI.util.getRunningQueriesThunk()),
  ])

  if (promotedWikisError || categoriesError || tagsDataError || recentError) {
    throw new Error(
      `Error fetching data. the error is: ${
        (JSON.stringify(tagsDataError?.message),
        JSON.stringify(categoriesError?.message),
        JSON.stringify(promotedWikisError?.message),
        JSON.stringify(recentError?.message))
      }`,
    )
  }
  let sortedPromotedWikis: Wiki[] = []
  if (promotedWikis?.length) {
    sortedPromotedWikis = [...promotedWikis]
    sortedPromotedWikis?.sort((a, b) => a.promoted - b.promoted)
  }

  const sortedleaderboards = sortLeaderboards(leaderboard)

  const rankings = {
    NFTsListing: NFTsList,
    TokensListing: TokensList,
  }

  return {
    props: {
      promotedWikis: sortedPromotedWikis || [],
      recentWikis: recent || [],
      categories: categories || [],
      popularTags: tagsData || [],
      leaderboards: sortedleaderboards || [],
      rankings: rankings || [],
    },
  }
}

export default Index
