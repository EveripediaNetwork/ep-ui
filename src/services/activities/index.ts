import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_ACTIVITIES } from '@/services/activities/queries'
import config from '@/config'
import { Wiki } from '@/types/Wiki'

export type ActivityType = {
  id: string
  wikiId: string
  type: string
  content: Wiki[]
  datetime: string
}

type GetActivitiesResponse = {
  activities: ActivityType[]
}

type ActivitiesArg = {
  limit?: number
  offset?: number
}

export const activitiesApi = createApi({
  reducerPath: 'activitiesApi',
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
    getLatestActivities: builder.query<ActivityType[], ActivitiesArg>({
      query: ({ offset, limit }: ActivitiesArg) => ({
        document: GET_ACTIVITIES,
        variables: { offset, limit },
      }),
      transformResponse: (response: GetActivitiesResponse) =>
        response.activities,
    }),
  }),
})

export const {
  useGetLatestActivitiesQuery,
  util: { getRunningOperationPromises },
} = activitiesApi

export const { getLatestActivities } = activitiesApi.endpoints
