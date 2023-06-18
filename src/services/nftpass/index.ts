import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { GET_SUBSCRIPTION_HISTORY } from './queries'
import { NftPassType } from '@/types/nftPass'

type GetSubscriptionHistory = {
  retrieveBrainPass: NftPassType[]
}

export const subscriptionHistoryApi = createApi({
  reducerPath: 'subscriptionHistoryApi',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: (builder) => ({
    getSubscriptionHistory: builder.query<
      NftPassType[],
      `0x${string}` | undefined
    >({
      query: (address: `0x${string}` | undefined) => ({
        document: GET_SUBSCRIPTION_HISTORY,
        variables: { address },
      }),
      transformResponse: (response: GetSubscriptionHistory) => {
        return response.retrieveBrainPass
      },
    }),
  }),
})

export const { useGetSubscriptionHistoryQuery } = subscriptionHistoryApi

export const { getSubscriptionHistory } = subscriptionHistoryApi.endpoints
