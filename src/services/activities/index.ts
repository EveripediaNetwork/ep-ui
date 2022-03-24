import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_LATEST_ACTIVITIES } from '@/services/activities/queries'
import { Activity } from '@/types/ActivityDataType'
import config from '@/config'

type GetLatestActivitiesResponse = {
  wikis: Activity[]
}

export const activitiesApi = createApi({
  reducerPath: 'activitiesApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getLatestActivities: builder.query<Activity[], void>({
      query: () => ({ document: GET_LATEST_ACTIVITIES }),
      transformResponse: (response: GetLatestActivitiesResponse) =>
        response.wikis,
    }),
  }),
})

export const {
  useGetLatestActivitiesQuery,
  util: { getRunningOperationPromises },
} = activitiesApi

export const { getLatestActivities } = activitiesApi.endpoints
