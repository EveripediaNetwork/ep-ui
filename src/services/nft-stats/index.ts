import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export type NFTStats = {
  id: string
  name: string
  native_currency: string
  floor_price: { native_currency: number; usd: number }
  market_cap: { native_currency: number; usd: number }
  volume_24h: { native_currency: number; usd: number }
  floor_price_in_usd_24h_percentage_change: number
  number_of_unique_addresses: number
  number_of_unique_addresses_24h_percentage_change: number
  total_supply: number
}

export const nftStatsApi = createApi({
  reducerPath: 'nftStatApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),
  endpoints: builder => ({
    getNFTStats: builder.query<NFTStats, string>({
      query: (nftID: string) => `nfts/${nftID}`,
    }),
  }),
})

export const {
  useGetNFTStatsQuery,
  util: { getRunningOperationPromises },
} = nftStatsApi

export const { getNFTStats } = nftStatsApi.endpoints
