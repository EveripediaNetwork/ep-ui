import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { ADD_WIKI_SUBSCRIPTION } from './queries'

type AddWikiSubscriptionArgs = {
  userId: string
  notificationType: string
  email: string
  auxiliaryId: string
}

export const notificationSubscriptionApi = createApi({
  reducerPath: 'notificationSubscriptionApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    addSubscription: builder.mutation<string, AddWikiSubscriptionArgs>({
      query: (addWikiSubscriptionArgs: AddWikiSubscriptionArgs) => {
        return {
          document: ADD_WIKI_SUBSCRIPTION,
          variables: {
            userId: addWikiSubscriptionArgs.userId,
            auxiliaryId: addWikiSubscriptionArgs.auxiliaryId,
            notificationType: addWikiSubscriptionArgs.notificationType,
            email: addWikiSubscriptionArgs.email,
          },
        }
      },
    }),
  }),
})

// export const { useGetNo } = notificationSubscriptionApi
// export const { getNo } = notificationSubscriptionApi.endpoints
