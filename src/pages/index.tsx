import React from 'react'
// import { Box, Flex } from '@chakra-ui/react'
// import dynamic from 'next/dynamic'
// import { getPromotedWikis, getTrendingWikis, getWikis } from '@/services/wikis'
// import { store } from '@/store/store'
// import { Wiki } from '@everipedia/iq-utils'
// // import TrendingWikis from '@/components/Landing/TrendingWikis'
// import { getTags } from '@/services/tags'
// // const DiscoverMore = dynamic(() => import('@/components/Landing/DiscoverMore'))
// // const LeaderBoard = dynamic(() => import('@/components/Landing/Leaderboard'))
// import { getLeaderboard, LeaderBoardType } from '@/services/editor'
// import { sortLeaderboards } from '@/utils/DataTransform/leaderboard.utils'
// import { RankCardType } from '@/types/RankDataTypes'
// // const RankingList = dynamic(() => import('@/components/Landing/RankingList'))
// import {
//   getAiTokenRanking,
//   getNFTRanking,
//   getTokenRanking,
//   getStableCoinRanking,
//   getFoundersRanking,
// } from '@/services/ranking'
// // import { Hero } from '@/components/Landing/Hero'
// import { DayRangeType, getDateRange } from '@/utils/HomepageUtils/getDate'
// import { TrendingData } from '@/types/Home'
// // const AboutIqgpt = dynamic(() => import('@/components/Landing/AboutIqgpt'))
// import { GetServerSideProps } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// // import CategoriesList from '@/components/Landing/CategoriesList'

// const RANKING_LIST_LIMIT = 10
// const TRENDING_WIKIS_AMOUNT = 5

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

export const Index = (
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  {
    // promotedWikis,
    // recentWikis,
    // popularTags,
    // leaderboards,
    // rankings,
    // trending,
  },
) => {
  // console.log({
  //   promotedWikis,
  //   recentWikis,
  //   popularTags,
  //   leaderboards,
  //   rankings,
  //   trending,
  // })

  return (
    <div>&nbsp;</div>
    // <Flex
    //   _dark={{
    //     bgColor: '#1A202C',
    //   }}
    //   direction="column"
    //   mx="auto"
    //   w="full"
    //   pt={{ base: 6, lg: 12 }}
    // >
    //   {/* <Hero />
    //   <Box>
    //     <TrendingWikis
    //       trending={trending}
    //       recent={recentWikis?.slice(0, 5)}
    //       featuredWikis={promotedWikis}
    //     />
    //     <RankingList listingLimit={RANKING_LIST_LIMIT} rankings={rankings} />
    //     <AboutIqgpt />
    //     <CategoriesList />
    //   </Box>
    //   {leaderboards.length > 0 && <LeaderBoard leaderboards={leaderboards} />}
    //   <DiscoverMore tagsData={popularTags} /> */}
    // </Flex>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
//   const dateRanges = Object.values(DayRangeType).map(rangeType =>
//     getDateRange({ rangeType }),
//   )

//   const [
//     { data: promotedWikis, error: promotedWikisError },
//     { data: recent, error: recentError },
//     { data: leaderboard },
//     { data: tagsData, error: tagsDataError },
//     { data: NFTsList },
//     { data: TokensList },
//     { data: foundersData },
//     { data: aiTokensList },
//     { data: stableCoinsList },
//     { data: todayTrending },
//     { data: weekTrending },
//     { data: monthTrending },
//   ] = await Promise.all([
//     store.dispatch(getPromotedWikis.initiate()),
//     store.dispatch(getWikis.initiate()),
//     store.dispatch(getLeaderboard.initiate()),
//     store.dispatch(
//       getTags.initiate({
//         startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
//         endDate: Math.floor(Date.now() / 1000),
//       }),
//     ),
//     store.dispatch(
//       getNFTRanking.initiate({
//         kind: 'NFT',
//         limit: RANKING_LIST_LIMIT,
//         offset: 1,
//       }),
//     ),
//     store.dispatch(
//       getTokenRanking.initiate({
//         kind: 'TOKEN',
//         limit: RANKING_LIST_LIMIT,
//         offset: 1,
//       }),
//     ),
//     store.dispatch(
//       getFoundersRanking.initiate({
//         kind: 'TOKEN',
//         limit: RANKING_LIST_LIMIT,
//         offset: 1,
//         founders: true,
//       }),
//     ),
//     store.dispatch(
//       getAiTokenRanking.initiate({
//         kind: 'TOKEN',
//         limit: RANKING_LIST_LIMIT,
//         offset: 1,
//         category: 'AI',
//       }),
//     ),
//     store.dispatch(
//       getStableCoinRanking.initiate({
//         kind: 'TOKEN',
//         limit: RANKING_LIST_LIMIT,
//         offset: 1,
//         category: 'STABLE_COINS',
//       }),
//     ),
//     store.dispatch(
//       getTrendingWikis.initiate({
//         amount: TRENDING_WIKIS_AMOUNT,
//         startDay: dateRanges[0].startDay,
//         endDay: dateRanges[0].endDay,
//       }),
//     ),
//     store.dispatch(
//       getTrendingWikis.initiate({
//         amount: TRENDING_WIKIS_AMOUNT,
//         startDay: dateRanges[1].startDay,
//         endDay: dateRanges[1].endDay,
//       }),
//     ),
//     store.dispatch(
//       getTrendingWikis.initiate({
//         amount: TRENDING_WIKIS_AMOUNT,
//         startDay: dateRanges[2].startDay,
//         endDay: dateRanges[2].endDay,
//       }),
//     ),
//   ])

//   if (promotedWikisError || tagsDataError || recentError) {
//     throw new Error(
//       `Error fetching data: ${[promotedWikisError, tagsDataError, recentError]
//         .map(error => error?.message)
//         .filter(Boolean)
//         .join(', ')}`,
//     )
//   }

//   const sortedPromotedWikis = promotedWikis
//     ? [...promotedWikis].sort((a, b) => a.promoted - b.promoted)
//     : []

//   const sortedleaderboards = leaderboard ? sortLeaderboards(leaderboard) : []
//   const rankings = {
//     NFTsListing: NFTsList ?? [],
//     aiTokensListing: aiTokensList ?? [],
//     TokensListing: TokensList ?? [],
//     stableCoinsListing: stableCoinsList ?? [],
//     foundersListing: foundersData ?? [],
//   }

//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? 'en', [
//         'common',
//         'home',
//         'category',
//         'rank',
//         'wiki',
//       ])),
//       promotedWikis: sortedPromotedWikis,
//       recentWikis: recent ?? [],
//       popularTags: tagsData ?? [],
//       leaderboards: sortedleaderboards,
//       rankings,
//       trending: { todayTrending, weekTrending, monthTrending },
//     },
//   }
// }

export default Index
