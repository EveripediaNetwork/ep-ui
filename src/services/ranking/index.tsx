import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_NFT_RANKINGS,
  GET_TOKEN_RANKINGS,
} from '@/services/ranking/queries'
import config from '@/config'

export const rankingAPI = createApi({
  reducerPath: 'rankingAPI',
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getNFTRanking: builder.query<
      any,
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
      transformResponse: (response: any) => response.rankList,
    }),
    getTokenRanking: builder.query<
      any,
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
      transformResponse: (response: any) => response.rankList,
    }),
  }),
})

export const { useGetNFTRankingQuery, useGetTokenRankingQuery } = rankingAPI

export const { getNFTRanking, getTokenRanking } = rankingAPI.endpoints
