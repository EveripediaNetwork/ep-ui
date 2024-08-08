import React from 'react'
import dynamic from 'next/dynamic'
import {
  getPromotedWikis,
  getTrendingWikis,
  getWikis,
  getWikisAndCategories,
  wikiApi,
  type PromotedWikisBuilder,
  type RecentWikisBuilder,
} from '@/services/wikis'
import { store } from '@/store/store'
import type { BaseTag, Wiki } from '@everipedia/iq-utils'
import TrendingWikis from '@/components/Landing/TrendingWikis'
const CategoriesList = dynamic(
  () => import('@/components/Landing/CategoriesList'),
  {
    ssr: false,
  },
)
import { getTags, tagsApi } from '@/services/tags'
const DiscoverMore = dynamic(() => import('@/components/Landing/DiscoverMore'))
const LeaderBoard = dynamic(() => import('@/components/Landing/Leaderboard'))
import {
  editorApi,
  getLeaderboard,
  type LeaderBoardType,
} from '@/services/editor'
import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
import type { RankCardType } from '@/types/RankDataTypes'
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
import type { TrendingData } from '@/types/Home'
const AboutIqgpt = dynamic(() => import('@/components/Landing/AboutIqgpt'))
import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import EventOverview from '@/components/Landing/EventOverview'
import { IQBar } from '@/components/Landing/IQBar'
import type { TGraphQLError } from '@/components/CreateWiki/CreateWikiTopBar/WikiPublish/WikiPublishButton'
import type { CategoryAndWikiDataProps } from '@/types/CategoryDataTypes'

const RANKING_LIST_LIMIT = 10
const TRENDING_WIKIS_AMOUNT = 5

interface HomePageProps {
  promotedWikis: Wiki[]
  recentWikis: Wiki[]
  popularTags: { id: string }[]
  leaderboards: LeaderBoardType[]
  categories: CategoryAndWikiDataProps[]
  rankings: {
    NFTsListing: RankCardType[]
    aiTokensListing: RankCardType[]
    TokensListing: RankCardType[]
    stableCoinsListing: RankCardType[]
    foundersListing: RankCardType[]
  }
  trending: TrendingData
  isLoading: boolean
}

export const Index = ({
  promotedWikis,
  popularTags,
  leaderboards,
  rankings,
  trending,
  categories,
}: HomePageProps) => {
  console.log(leaderboards)
  return (
    <section>
      <Hero />
      <IQBar />
      <div className="relative">
        <TrendingWikis trending={trending} featuredWikis={promotedWikis} />
        <RankingList listingLimit={RANKING_LIST_LIMIT} rankings={rankings} />
        <AboutIqgpt />
        <CategoriesList categories={categories} />
        <EventOverview />
      </div>
      {leaderboards?.length > 0 && <LeaderBoard leaderboards={leaderboards} />}
      <DiscoverMore tagsData={popularTags} />
    </section>
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

  const { data: promotedWikis, error: promotedWikisError } =
    (await store.dispatch(getPromotedWikis.initiate())) as {
      data?: PromotedWikisBuilder[]
      error: TGraphQLError
    }
  const { data: recent, error: recentError } = (await store.dispatch(
    getWikis.initiate(),
  )) as { data?: RecentWikisBuilder[]; error: TGraphQLError }

  const { data: leaderboard } = await store.dispatch(getLeaderboard.initiate())
  const { data: tagsData, error: tagsDataError } = (await store.dispatch(
    getTags.initiate({
      startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
      endDate: Math.floor(Date.now() / 1000),
    }),
  )) as { data?: BaseTag[]; error: TGraphQLError }

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
  const { data: foundersData } = await store.dispatch(
    getFoundersRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      founders: true,
    }),
  )
  const { data: aiTokensList } = await store.dispatch(
    getAiTokenRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'AI',
    }),
  )
  const { data: stableCoinsList } = await store.dispatch(
    getStableCoinRanking.initiate({
      kind: 'TOKEN',
      limit: RANKING_LIST_LIMIT,
      offset: 1,
      category: 'STABLE_COINS',
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

  const { data: categories } = await store.dispatch(
    getWikisAndCategories.initiate({
      limit: 8,
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
        tagsDataError?.error?.message,
        promotedWikisError?.error?.message,
        tagsDataError?.error?.message,
        recentError?.error?.message,
      ].join(' ')}
      }`,
    )
  }
  let sortedPromotedWikis: PromotedWikisBuilder[] = []
  if (promotedWikis) {
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
      trending: { todayTrending, weekTrending, monthTrending },
      categories: categories,
    },
  }
}

export default Index
