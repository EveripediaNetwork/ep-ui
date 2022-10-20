import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { GET_TOKEN_STATS } from '@/services/token-stats/queries'

export type TokenStats = {
  id: string
  symbol: string
  name: string
  market_cap: number
  market_cap_percentage_change: number
  diluted_market_cap: number
  diluted_market_cap_percentage_change: number
  volume: number
  token_price_in_usd: number
  volume_percentage_change: number
}

type GetTokenStatsResponse = {
  tokenStats: TokenStats
}

export const tokenStatsApi = createApi({
  reducerPath: 'tokenStats',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getTokenStats: builder.query<
      TokenStats,
      { tokenName: string; cmcTokenName?: string }
    >({
      query: ({
        tokenName,
        cmcTokenName,
      }: {
        tokenName: string
        cmcTokenName?: string
      }) => ({
        document: GET_TOKEN_STATS,
        variables: { tokenName, cmcTokenName },
      }),
      transformResponse: (response: GetTokenStatsResponse) =>
        response.tokenStats,
    }),
  }),
})

export const {
  useGetTokenStatsQuery,
  util: { getRunningOperationPromises },
} = tokenStatsApi

export const { getTokenStats } = tokenStatsApi.endpoints
