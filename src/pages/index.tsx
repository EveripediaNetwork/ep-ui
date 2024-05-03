import React from 'react'
import { Flex } from '@chakra-ui/react'
import { getPromotedWikis, getTrendingWikis, getWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { getTags } from '@/services/tags'
import { getLeaderboard } from '@/services/editor'
import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
import {
  getAiTokenRanking,
  getNFTRanking,
  getTokenRanking,
  getStableCoinRanking,
  getFoundersRanking,
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

  console.log('Date Ranges', {
    todayStartDay,
    todayEndDay,
    weekStartDay,
    weekEndDay,
    monthStartDay,
    monthEndDay,
  })

  // Initialize an array to store potential errors for frontend handling
  //@ts-ignore
  const errors = []

  // Helper function to fetch data and handle errors
  //@ts-ignore
  const fetchData = async (dispatchFunction, name) => {
    try {
      const result = await store.dispatch(dispatchFunction)
      if (result.error) throw result.error
      return result.data
    } catch (error) {
      //@ts-ignore
      console.error(`Error fetching ${name}:`, error.message)
      //@ts-ignore
      errors.push({ name, message: error.message })
      return [] // Default empty state for lists, adjust if different data structure is expected
    }
  }

  // Perform API calls
  const promotedWikis = await fetchData(
    getPromotedWikis.initiate(),
    'promoted wikis',
  )
  const recent = await fetchData(getWikis.initiate(), 'recent wikis')
  const leaderboard = await fetchData(getLeaderboard.initiate(), 'leaderboard')
  const tagsData = await fetchData(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
    'tags',
  )
  const NFTsList = await fetchData(
    getNFTRanking.initiate({
      kind: 'NFT',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
    'NFT rankings',
  )
  const TokensList = await fetchData(
    getTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
    'token rankings',
  )
  const foundersData = await fetchData(
    getFoundersRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      founders: true,
    }),
    'founders rankings',
  )
  const aiTokensList = await fetchData(
    getAiTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'AI',
    }),
    'AI token rankings',
  )
  const stableCoinsList = await fetchData(
    getStableCoinRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'STABLE_COINS',
    }),
    'stable coin rankings',
  )
  const todayTrending = await fetchData(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: todayStartDay,
      endDay: todayEndDay,
    }),
    'today trending wikis',
  )
  const weekTrending = await fetchData(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: weekStartDay,
      endDay: weekEndDay,
    }),
    'week trending wikis',
  )
  const monthTrending = await fetchData(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: monthStartDay,
      endDay: monthEndDay,
    }),
    'month trending wikis',
  )

  // Process data for returning
  const sortedLeaderboards = leaderboard.length
    ? sortLeaderboards(leaderboard)
    : []
  const rankings = {
    NFTsListing: NFTsList,
    aiTokensListing: aiTokensList,
    TokensListing: TokensList,
    stableCoinsListing: stableCoinsList,
    foundersListing: foundersData,
  }
  const trending = {
    todayTrending,
    weekTrending,
    monthTrending,
  }

  // Translation setup, include errors if any
  const translations = await serverSideTranslations(locale ?? 'en', [
    'common',
    'home',
    'category',
    'rank',
    'wiki',
    'event',
  ])

  return {
    props: {
      ...translations,
      promotedWikis,
      recent,
      popularTags: tagsData,
      leaderboards: sortedLeaderboards,
      rankings,
      trending,
      //@ts-ignore
      errors: errors.length ? errors : null, // Pass errors to frontend if any
    },
  }
}

export default Index
