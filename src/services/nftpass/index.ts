import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { GET_SUBSCRIPTION_HISTORY } from './queries'
import { NftPassType, PassParamsType } from '@/types/nftPass'

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
    getSubscriptionHistory: builder.query<NftPassType[], PassParamsType>({
      query: ({ address, limit, offset }: PassParamsType) => ({
        document: GET_SUBSCRIPTION_HISTORY,
        variables: { address, limit, offset },
      }),
      transformResponse: (response: GetSubscriptionHistory) => {
        return response.retrieveBrainPass
      },
    }),
  }),
})

export const { useGetSubscriptionHistoryQuery } = subscriptionHistoryApi

export const { getSubscriptionHistory } = subscriptionHistoryApi.endpoints
