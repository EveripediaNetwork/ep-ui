import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  ADD_WIKI_SUBSCRIPTION,
  REMOVE_WIKI_SUBSCRIPTION,
  WIKI_SUBSCRIPTIONS,
} from '@/services/notification/queries'
import { ActivityCardDetails } from '@/types/Wiki'
import { profileApiClient } from '../profile'

export interface SubscriptionArgs {
  userId: string
  subscriptionType: string
  email: string
  auxiliaryId: string
  wiki: ActivityCardDetails
}

export type WikiSubs = {
  auxiliaryId: string
  subscriptionType: string
  wiki: ActivityCardDetails
}

export type WikiSubsResponse = {
  wikiSubscriptions: WikiSubs[]
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
  baseQuery: graphqlRequestBaseQuery({ client: profileApiClient }),
  endpoints: builder => ({
    addSubscription: builder.mutation<string, SubscriptionArgs>({
      query: (addWikiSubscriptionArgs: SubscriptionArgs) => {
        return {
          document: ADD_WIKI_SUBSCRIPTION,
          variables: {
            userId: addWikiSubscriptionArgs.userId,
            auxiliaryId: addWikiSubscriptionArgs.auxiliaryId,
            subscriptionType: addWikiSubscriptionArgs.subscriptionType,
            email: addWikiSubscriptionArgs.email,
          },
        }
      },
      async onQueryStarted(
        { userId, auxiliaryId, subscriptionType, wiki },
        { dispatch, queryFulfilled },
      ) {
        if (!userId) return
        const patchResult = dispatch(
          notificationSubscriptionApi.util.updateQueryData(
            'getAllWikiSubscription',
            userId,
            list => [...list, { auxiliaryId, subscriptionType, wiki }],
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    removeSubscription: builder.mutation<
      boolean,
      Omit<SubscriptionArgs, 'wiki'>
    >({
      query: (removeWikiSubscriptionArgs: SubscriptionArgs) => {
        return {
          document: REMOVE_WIKI_SUBSCRIPTION,
          variables: {
            userId: removeWikiSubscriptionArgs.userId,
            auxiliaryId: removeWikiSubscriptionArgs.auxiliaryId,
            subscriptionType: removeWikiSubscriptionArgs.subscriptionType,
            email: removeWikiSubscriptionArgs.email,
          },
        }
      },
      async onQueryStarted(
        { userId, auxiliaryId },
        { dispatch, queryFulfilled },
      ) {
        if (!userId) return
        const patchResult = dispatch(
          notificationSubscriptionApi.util.updateQueryData(
            'getAllWikiSubscription',
            userId,
            list => list.filter(sub => sub.auxiliaryId !== auxiliaryId),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
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

      transformResponse: (response: WikiSubsResponse) =>
        response.wikiSubscriptions,
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
