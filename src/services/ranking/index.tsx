import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_NFT_RANKINGS,
  GET_RANK_COUNT,
  GET_TOKEN_RANKINGS,
  GET_AI_TOKEN_RANKINGS,
  GET_STABLECOIN_RANKINGS,
  GET_FOUNDERS_RANKINGS,
} from '@/services/ranking/queries'
import config from '@/config'
import type { RankCardType } from '@/types/RankDataTypes'

type RankListResponse = {
  rankList: RankCardType[]
}

type RankCount = {
  categoryTotal: {
    amount: number
  }
}

export const rankingAPI = createApi({
  reducerPath: 'rankingAPI',
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: (builder) => ({
    getNFTRanking: builder.query<
      RankCardType[],
      {
        kind: string
        limit: number
        offset: number
      }
    >({
      query: ({
        kind,
        limit,
        offset,
      }: {
        kind: string
        limit?: number
        offset?: number
      }) => ({
        document: GET_NFT_RANKINGS,
        variables: { kind, limit, offset },
      }),
      transformResponse: (response: RankListResponse) => response.rankList,
    }),
    getTokenRanking: builder.query<
      RankCardType[],
      {
        kind: string
        limit: number
        offset: number
      }
    >({
      query: ({
        kind,
        limit,
        offset,
      }: {
        kind: string
        limit?: number
        offset?: number
      }) => ({
        document: GET_TOKEN_RANKINGS,
        variables: { kind, limit, offset },
      }),
      transformResponse: (response: RankListResponse) => response.rankList,
    }),
    getAiTokenRanking: builder.query<
      RankCardType[],
      {
        kind: string
        limit: number
        offset: number
        category: string
      }
    >({
      query: ({
        kind,
        limit,
        offset,
        category,
      }: {
        kind: string
        limit?: number
        offset?: number
        category: string
      }) => ({
        document: GET_AI_TOKEN_RANKINGS,
        variables: { kind, limit, offset, category },
      }),
      transformResponse: (response: RankListResponse) => response.rankList,
    }),
    getStableCoinRanking: builder.query<
      RankCardType[],
      {
        kind: string
        limit: number
        offset: number
        category: string
      }
    >({
      query: ({
        kind,
        limit,
        offset,
        category,
      }: {
        kind: string
        limit?: number
        offset?: number
        category: string
      }) => ({
        document: GET_STABLECOIN_RANKINGS,
        variables: { kind, limit, offset, category },
      }),
      transformResponse: (response: RankListResponse) => response.rankList,
    }),
    getFoundersRanking: builder.query<
      RankCardType[],
      {
        kind: string
        limit: number
        offset: number
        founders: boolean
      }
    >({
      query: ({
        kind,
        limit,
        offset,
        founders,
      }: {
        kind: string
        limit?: number
        offset?: number
        founders: boolean
      }) => ({
        document: GET_FOUNDERS_RANKINGS,
        variables: { kind, limit, offset, founders },
      }),
      transformResponse: (response: RankListResponse) => response.rankList,
    }),
    getCategoryTotal: builder.query<RankCount, { category: string }>({
      query: ({ category }: { category: string }) => ({
        document: GET_RANK_COUNT,
        variables: { category },
      }),
    }),
  }),
})

export const {
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
  useGetAiTokenRankingQuery,
  useGetStableCoinRankingQuery,
  useGetFoundersRankingQuery,
  useGetCategoryTotalQuery,
} = rankingAPI

export const {
  getNFTRanking,
  getTokenRanking,
  getAiTokenRanking,
  getStableCoinRanking,
  getFoundersRanking,
  getCategoryTotal,
} = rankingAPI.endpoints
