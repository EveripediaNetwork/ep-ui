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

  try {
    const results = await Promise.all([
      store.dispatch(getPromotedWikis.initiate()),
      store.dispatch(getWikis.initiate()),
      store.dispatch(getLeaderboard.initiate()),
      store.dispatch(
        getTags.initiate({
          startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
          endDate: Math.floor(Date.now() / 1000),
        }),
      ),
      store.dispatch(
        getNFTRanking.initiate({
          kind: 'NFT',
          limit: RANKING_LIST_LIMIT,
          offset: 1,
        }),
      ),
      store.dispatch(
        getTokenRanking.initiate({
          kind: 'TOKEN',
          limit: RANKING_LIST_LIMIT,
          offset: 1,
        }),
      ),
      store.dispatch(
        getFoundersRanking.initiate({
          kind: 'TOKEN',
          limit: RANKING_LIST_LIMIT,
          offset: 1,
          founders: true,
        }),
      ),
      store.dispatch(
        getAiTokenRanking.initiate({
          kind: 'TOKEN',
          limit: RANKING_LIST_LIMIT,
          offset: 1,
          category: 'AI',
        }),
      ),
      store.dispatch(
        getStableCoinRanking.initiate({
          kind: 'TOKEN',
          limit: RANKING_LIST_LIMIT,
          offset: 1,
          category: 'STABLE_COINS',
        }),
      ),
      store.dispatch(
        getTrendingWikis.initiate({
          amount: TRENDING_WIKIS_AMOUNT,
          startDay: todayStartDay,
          endDay: todayEndDay,
        }),
      ),
      store.dispatch(
        getTrendingWikis.initiate({
          amount: TRENDING_WIKIS_AMOUNT,
          startDay: weekStartDay,
          endDay: weekEndDay,
        }),
      ),
      store.dispatch(
        getTrendingWikis.initiate({
          amount: TRENDING_WIKIS_AMOUNT,
          startDay: monthStartDay,
          endDay: monthEndDay,
        }),
      ),
    ])

    const [
      promotedWikis,
      recent,
      leaderboard,
      tagsData,
      NFTsList,
      TokensList,
      foundersData,
      aiTokensList,
      stableCoinsList,
      todayTrending,
      weekTrending,
      monthTrending,
    ] = results.map((r) => r.data)
    const errors = results.map((r) => r.error).filter((e) => e)

    console.log('Retrieved Data', {
      promotedWikis,
      recent,
      leaderboard,
      tagsData,
      NFTsList,
      TokensList,
      foundersData,
      aiTokensList,
      stableCoinsList,
      todayTrending,
      weekTrending,
      monthTrending,
    })

    if (errors.length > 0) {
      console.error(
        'Errors encountered:',
        errors.map((e) => `${e}-${e?.message}`),
      )
    }

    //@ts-ignore
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
  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return {
      props: {
        error: 'Failed to load data',
      },
    }
  }
}

export default Index
