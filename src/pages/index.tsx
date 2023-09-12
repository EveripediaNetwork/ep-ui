import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getTrendingWikis,
  getWikis,
  wikiApi,
  PromotedWikisBuilder,
} from '@/services/wikis'
import { store } from '@/store/store'
import { Wiki } from '@everipedia/iq-utils'
import TrendingWikis from '@/components/Landing/TrendingWikis'
import CategoriesList from '@/components/Landing/CategoriesList'
import { getTags, tagsApi } from '@/services/tags'
import DiscoverMore from '@/components/Landing/DiscoverMore'
import LeaderBoard from '@/components/Landing/Leaderboard'
import { editorApi, getLeaderboard, LeaderBoardType } from '@/services/editor'
import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
import { RankCardType } from '@/types/RankDataTypes'
import RankingList from '@/components/Landing/RankingList'
import { nftLisitngAPI } from '@/services/nftlisting'
import { getNFTRanking, getTokenRanking, rankingAPI } from '@/services/ranking'
import { Hero } from '@/components/Landing/Hero'
import { DayRangeType, getDateRange } from '@/utils/HomepageUtils/getDate'
import { TrendingData } from '@/types/Home'
import AboutIqgpt from '@/components/Landing/AboutIqgpt'
import { GetServerSideProps } from 'next'

const RANKING_LIST_LIMIT = 10
const TRENDING_WIKIS_AMOUNT = 5

interface HomePageProps {
  promotedWikis: Wiki[]
  recentWikis: Wiki[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
  trending: TrendingData
}

export const Index = ({
  promotedWikis,
  recentWikis,
  popularTags,
  leaderboards,
  rankings,
  trending,
}: HomePageProps) => {
  return (
    <Flex
      _dark={{
        bgColor: '#1A202C',
      }}
      direction="column"
      mx="auto"
      w="full"
      pt={{ base: 6, lg: 12 }}
    >
      <Hero />
      <Box>
        <TrendingWikis
          trending={trending}
          recent={recentWikis?.slice(0, 5)}
          featuredWikis={promotedWikis && promotedWikis}
        />
        <AboutIqgpt />
        <RankingList listingLimit={RANKING_LIST_LIMIT} rankings={rankings} />
        <CategoriesList />
      </Box>
      {leaderboards.length > 0 && <LeaderBoard leaderboards={leaderboards} />}
      <DiscoverMore tagsData={popularTags} />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { startDay: todayStartDay, endDay: todayEndDay } = getDateRange({
    rangeType: DayRangeType.TODAY,
  })
  const { startDay: weekStartDay, endDay: weekEndDay } = getDateRange({
    rangeType: DayRangeType.LAST_WEEK,
  })

  const { startDay: monthStartDay, endDay: monthEndDay } = getDateRange({
    rangeType: DayRangeType.LAST_MONTH,
  })

  const { data: promotedWikis, error: promotedWikisError } =
    await store.dispatch(getPromotedWikis.initiate())
  const { data: recent, error: recentError } = await store.dispatch(
    getWikis.initiate(),
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

  const { data: todayTrending } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: todayStartDay,
      endDay: todayEndDay,
    }),
  )

  const { data: weekTrending } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: weekStartDay,
      endDay: weekEndDay,
    }),
  )

  const { data: monthTrending } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: monthStartDay,
      endDay: monthEndDay,
    }),
  )

  await Promise.all([
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(tagsApi.util.getRunningQueriesThunk()),
    store.dispatch(editorApi.util.getRunningQueriesThunk()),
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(nftLisitngAPI.util.getRunningQueriesThunk()),
    store.dispatch(rankingAPI.util.getRunningQueriesThunk()),
  ])

  if (promotedWikisError || tagsDataError || recentError) {
    throw new Error(
      `Error fetching data. the error is: ${[
        JSON.stringify(tagsDataError?.message),
        JSON.stringify(promotedWikisError?.message),
        JSON.stringify(tagsDataError?.message),
        JSON.stringify(recentError?.message),
      ].join(' ')}
      }`,
    )
  }
  let sortedPromotedWikis: PromotedWikisBuilder[] = []
  if (promotedWikis?.length) {
    sortedPromotedWikis = [...promotedWikis]
    sortedPromotedWikis?.sort((a, b) => a.promoted - b.promoted)
  }

  const sortedleaderboards = sortLeaderboards(leaderboard)

  const rankings = {
    NFTsListing: NFTsList || [],
    TokensListing: TokensList || [],
  }

  return {
    props: {
      promotedWikis: sortedPromotedWikis || [],
      recentWikis: recent || [],
      popularTags: tagsData || [],
      leaderboards: sortedleaderboards || [],
      rankings: rankings,
      trending: { todayTrending, weekTrending, monthTrending },
    },
  }
}

export default Index
