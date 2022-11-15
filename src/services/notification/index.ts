import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import {
  ADD_WIKI_SUBSCRIPTION,
  REMOVE_WIKI_SUBSCRIPTION,
  WIKI_SUBSCRIPTIONS,
} from '@/services/notification/queries'

export type SubscriptionArgs = {
  userId?: string
  notificationType?: string
  email: string
  auxiliaryId?: string
}

export type WikiSubs = {
  auxiliaryId: string
  notificationType: string
}

export interface AddWikiSubscriptionArgs extends SubscriptionArgs {
  addwikiSubscription: SubscriptionArgs
}

export interface RemoveWikiSubscriptionArgs extends SubscriptionArgs {
  removeWikiSubscription: SubscriptionArgs
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
    removeSubscription: builder.mutation<boolean, RemoveWikiSubscriptionArgs>({
      query: (removeWikiSubscriptionArgs: RemoveWikiSubscriptionArgs) => {
        return {
          document: REMOVE_WIKI_SUBSCRIPTION,
          variables: {
            userId: removeWikiSubscriptionArgs.userId,
            auxiliaryId: removeWikiSubscriptionArgs.auxiliaryId,
            notificationType: removeWikiSubscriptionArgs.notificationType,
            email: removeWikiSubscriptionArgs.email,
          },
        }
      },
    }),
    getAllWikiSubscription: builder.query<WikiSubs[], string>({
      query: (userId: string) => {
        return {
          document: WIKI_SUBSCRIPTIONS,
          variables: { userId },
        }
      },
    }),
  }),
})

export const {
  useAddSubscriptionMutation,
  useRemoveSubscriptionMutation,
  useGetAllWikiSubscriptionQuery,
} = notificationSubscriptionApi

export const { addSubscription, removeSubscription, getAllWikiSubscription } =
  notificationSubscriptionApi.endpoints
