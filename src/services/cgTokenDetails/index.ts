import { HYDRATE } from 'next-redux-wrapper'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cgTokenDataApi = createApi({
  reducerPath: 'cgTokenDataApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/cg-token-data',
  }),
  refetchOnMountOrArgChange: 60,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getCgTokenData: builder.query<
      {
        prices?: {
          name: number
          amt: number
        }[]
        last_price?: number
        last_market_cap?: number
        total_volumes?: number[][]
        status: boolean
        message: string
      },
      void
    >({
      query: () => '',
    }),
  }),
})

export const { useGetCgTokenDataQuery } = cgTokenDataApi

export const { getCgTokenData } = cgTokenDataApi.endpoints
