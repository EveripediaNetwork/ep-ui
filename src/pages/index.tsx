import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
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
const CategoriesList = dynamic(
  () => import('@/components/Landing/CategoriesList'),
)
import { getTags, tagsApi } from '@/services/tags'
const DiscoverMore = dynamic(() => import('@/components/Landing/DiscoverMore'))
const LeaderBoard = dynamic(() => import('@/components/Landing/Leaderboard'))
import { editorApi, getLeaderboard, LeaderBoardType } from '@/services/editor'
import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
import { RankCardType } from '@/types/RankDataTypes'
const RankingList = dynamic(() => import('@/components/Landing/RankingList'))
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
import { TrendingData } from '@/types/Home'
const AboutIqgpt = dynamic(() => import('@/components/Landing/AboutIqgpt'))
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import EventOverview from '@/components/Landing/EventOverview'
import { IQBar } from '@/components/Landing/IQBar'

const RANKING_LIST_LIMIT = 10
const TRENDING_WIKIS_AMOUNT = 5

interface HomePageProps {
  promotedWikis: Wiki[]
  recentWikis: Wiki[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
  rankings: {
    NFTsListing: RankCardType[]
    aiTokensListing: RankCardType[]
    TokensListing: RankCardType[]
    stableCoinsListing: RankCardType[]
    foundersListing: RankCardType[]
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
    >
      <Hero />
      <IQBar />
      <Box
        mt={{ base: '-20', md: '-15', xl: '-10' }}
        px={0}
        className="container"
      >
        <TrendingWikis
          trending={trending}
          recent={recentWikis?.slice(0, 5)}
          featuredWikis={promotedWikis}
        />
        <RankingList listingLimit={RANKING_LIST_LIMIT} rankings={rankings} />
        <AboutIqgpt />
        <CategoriesList />
        <EventOverview />
      </Box>
      {leaderboards.length > 0 && <LeaderBoard leaderboards={leaderboards} />}
      <DiscoverMore tagsData={popularTags} />
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

  console.log('Fetching promoted wikis...')
  const { data: promotedWikis, error: promotedWikisError } =
    await store.dispatch(getPromotedWikis.initiate())
  console.log('Fetching recent wikis...')
  const { data: recent, error: recentError } = await store.dispatch(
    getWikis.initiate(),
  )
  console.log('Fetching leaderboard...')
  const { data: leaderboard } = await store.dispatch(getLeaderboard.initiate())
  console.log('Fetching tags data...')
  const { data: tagsData, error: tagsDataError } = await store.dispatch(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
  )

  console.log('Fetching NFT rankings...')
  const { data: NFTsList } = await store.dispatch(
    getNFTRanking.initiate({
      kind: 'NFT',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )

  console.log('Fetching token rankings...')
  const { data: TokensList } = await store.dispatch(
    getTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
    }),
  )
  console.log('Fetching founders rankings...')
  const { data: foundersData } = await store.dispatch(
    getFoundersRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      founders: true,
    }),
  )
  console.log('Fetching AI token rankings...')
  const { data: aiTokensList } = await store.dispatch(
    getAiTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'AI',
    }),
  )
  console.log('Fetching stable coin rankings...')
  const { data: stableCoinsList } = await store.dispatch(
    getStableCoinRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'STABLE_COINS',
    }),
  )

  console.log('Fetching today trending wikis...')
  const { data: todayTrending } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: todayStartDay,
      endDay: todayEndDay,
    }),
  )

  console.log('Fetching week trending wikis...')
  const { data: weekTrending } = await store.dispatch(
    getTrendingWikis.initiate({
      amount: TRENDING_WIKIS_AMOUNT,
      startDay: weekStartDay,
      endDay: weekEndDay,
    }),
  )

  console.log('Fetching month trending wikis...')
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

  console.log('Fetching complete.')

  if (promotedWikisError || tagsDataError || recentError) {
    console.error(
      'Error fetching data:',
      promotedWikisError,
      tagsDataError,
      recentError,
    )
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
      promotedWikis: sortedPromotedWikis ?? [],
      recentWikis: recent ?? [],
      popularTags: tagsData ?? [],
      leaderboards: sortedleaderboards ?? [],
      rankings: rankings,
      trending: {
        todayTrending: todayTrending || null,
        weekTrending: weekTrending || null,
        monthTrending: monthTrending || null,
      },
    },
  }
}

export default Index
