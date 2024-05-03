import React from 'react'
import { Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getTrendingWikis,
  getWikis,
  wikiApi,
} from '@/services/wikis'
import { store } from '@/store/store'
import { getTags, tagsApi } from '@/services/tags'
import { editorApi, getLeaderboard } from '@/services/editor'
import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
import { nftLisitngAPI } from '@/services/nftlisting'
import {
  getAiTokenRanking,
  getNFTRanking,
  getTokenRanking,
  getStableCoinRanking,
  getFoundersRanking,
  rankingAPI,
} from '@/services/ranking'
import { Hero } from '@/components/Landing/Hero'
import { DayRangeType, getDateRange } from '@/utils/HomepageUtils/getDate'
import { GetServerSideProps } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IQBar } from '@/components/Landing/IQBar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const RANKING_LIST_LIMIT = 10
const TRENDING_WIKIS_AMOUNT = 5

// interface HomePageProps {
//   promotedWikis: Wiki[]
//   recentWikis: Wiki[]
//   popularTags: { id: string }[]
//   leaderboards: LeaderBoardType[]
//   rankings: {
//     NFTsListing: RankCardType[]
//     aiTokensListing: RankCardType[]
//     TokensListing: RankCardType[]
//     stableCoinsListing: RankCardType[]
//     foundersListing: RankCardType[]
//   }
//   trending: TrendingData
// }

const Index = () => {
  return (
    <Flex
      _dark={{
        bgColor: '#1A202C',
      }}
      direction="column"
      mx="auto"
      w="full"
    >
      <Hero />
      <IQBar />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { startDay: todayStartDay, endDay: todayEndDay } = getDateRange({
    rangeType: DayRangeType.TODAY,
  })
  const { startDay: weekStartDay, endDay: weekEndDay } = getDateRange({
    rangeType: DayRangeType.LAST_WEEK,
  })

  const { startDay: monthStartDay, endDay: monthEndDay } = getDateRange({
    rangeType: DayRangeType.LAST_MONTH,
  })

  console.log({
    todayStartDay,
    todayEndDay,
    weekStartDay,
    weekEndDay,
    monthStartDay,
    monthEndDay,
  })

  const { data: promotedWikis, error: promotedWikisError } =
    await store.dispatch(getPromotedWikis.initiate())
  const { data: recent, error: recentError } = await store.dispatch(
    getWikis.initiate(),
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

  const { data: NFTsList, error: NFTsListError } = await store.dispatch(
    getNFTRanking.initiate({
      kind: 'NFT',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )

  const { data: TokensList, error: TokensListError } = await store.dispatch(
    getTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )
  const { data: foundersData, error: foundersDataError } = await store.dispatch(
    getFoundersRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      founders: true,
    }),
  )
  const { data: aiTokensList, error: aiTokensListError } = await store.dispatch(
    getAiTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'AI',
    }),
  )
  const { data: stableCoinsList, error: stableCoinsListError } =
    await store.dispatch(
      getStableCoinRanking.initiate({
        kind: 'TOKEN',
        limit: RANKING_LIST_LIMIT,
        offset: 1,
        category: 'STABLE_COINS',
      }),
    )

  const { data: todayTrending, error: todayTrendingError } =
    await store.dispatch(
      getTrendingWikis.initiate({
        amount: TRENDING_WIKIS_AMOUNT,
        startDay: todayStartDay,
        endDay: todayEndDay,
      }),
    )

  const { data: weekTrending, error: weekTrendingError } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: weekStartDay,
      endDay: weekEndDay,
    }),
  )

  const { data: monthTrending, error: monthTrendingError } =
    await store.dispatch(
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
    store.dispatch(nftLisitngAPI.util.getRunningQueriesThunk()),
    store.dispatch(rankingAPI.util.getRunningQueriesThunk()),
  ])

  console.error(
    'Errors encountered:',
    [
      promotedWikisError,
      recentError,
      leaderboardError,
      tagsDataError,
      NFTsListError,
      TokensListError,
      foundersDataError,
      aiTokensListError,
      stableCoinsListError,
      todayTrendingError,
      weekTrendingError,
      monthTrendingError,
    ]
      .filter(e => e)
      .map(e => `${e}-${e?.message}`),
  )

  const sortedleaderboards = leaderboard ? sortLeaderboards(leaderboard) : []
  const rankings = {
    NFTsListing: NFTsList ?? [],
    aiTokensListing: aiTokensList ?? [],
    TokensListing: TokensList ?? [],
    stableCoinsListing: stableCoinsList ?? [],
    foundersListing: foundersData ?? [],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'home',
        'category',
        'rank',
        'wiki',
        'event',
      ])),
      promotedWikis: promotedWikis ?? [],
      recentWikis: recent ?? [],
      popularTags: tagsData ?? [],
      leaderboards: sortedleaderboards,
      rankings: rankings,
      trending: {
        todayTrending: todayTrending ?? [],
        weekTrending: weekTrending ?? [],
        monthTrending: monthTrending ?? [],
      },
    },
  }
}

export default Index
