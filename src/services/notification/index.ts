import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  ADD_WIKI_SUBSCRIPTION,
  REMOVE_WIKI_SUBSCRIPTION,
  WIKI_SUBSCRIPTIONS,
} from '@/services/notification/queries'
import { profileApiClient } from '../profile'

export interface SubscriptionArgs {
  userId: string
  notificationType: string
  email: string
  auxiliaryId: string
}

export type WikiSubs = {
  auxiliaryId: string
  notificationType: string
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
            notificationType: addWikiSubscriptionArgs.notificationType,
            email: addWikiSubscriptionArgs.email,
          },
        }
      },
      async onQueryStarted(
        { userId, auxiliaryId, notificationType },
        { dispatch, queryFulfilled },
      ) {
        if (!userId) return
        const patchResult = dispatch(
          notificationSubscriptionApi.util.updateQueryData(
            'getAllWikiSubscription',
            userId,
            list => [...list, { auxiliaryId, notificationType }],
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    removeSubscription: builder.mutation<boolean, SubscriptionArgs>({
      query: (removeWikiSubscriptionArgs: SubscriptionArgs) => {
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
