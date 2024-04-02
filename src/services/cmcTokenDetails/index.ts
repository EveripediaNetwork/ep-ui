import { HYDRATE } from 'next-redux-wrapper'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cmcTokenDataApi = createApi({
  reducerPath: 'cmcTokenDataApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/cmc-token-details',
  }),
  refetchOnMountOrArgChange: 60,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getCmcTokenData: builder.query<
      {
        [tokenName: string]: {
          id: number
          name: string
          symbol: string
          slug: string
          num_market_pairs: number
          date_added: string
          tags: string[]
          max_supply: number
          circulating_supply: number
          total_supply: number
          platform: {
            id: number
            name: string
            symbol: string
            slug: string
            token_address: string
          }
          is_active: number
          infinite_supply: boolean
          cmc_rank: number
          is_fiat: number
          self_reported_circulating_supply: number
          self_reported_market_cap: number
          tvl_ratio: null
          last_updated: string
          quote: {
            USD: {
              price: number
              volume_24h: number
              volume_change_24h: number
              percent_change_1h: number
              percent_change_24h: number
              percent_change_7d: number
              percent_change_30d: number
              percent_change_60d: number
              percent_change_90d: number
              market_cap: number
              market_cap_dominance: number
              fully_diluted_market_cap: number
              tvl: null
              last_updated: string
            }
          }
        }
      },
      string
    >({
      query: (tokenName) => `?tokenName=${tokenName}`,
      transformResponse: (response: any) => {
        if (response?.response?.data) {
          return response.response.data
        }

        return undefined
      },
    }),
  }),
})

export const { useGetCmcTokenDataQuery } = cmcTokenDataApi
export const { getCmcTokenData } = cmcTokenDataApi.endpoints
