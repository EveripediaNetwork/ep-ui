import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_BY_ID,
  GET_ACTIVITIES_BY_WIKI,
  GET_LATEST_ACTIVITY_BY_WIKI,
  GET_WIKI_BY_ACTIVITY_ID,
  GET_WIKI_CREATOR_AND_EDITOR_BY_ACTIVITY_ID,
} from '@/services/activities/queries'
import config from '@/config'
import { Activity } from '@/types/ActivityDataType'
import { User, Wiki } from '@/types/Wiki'

type GetActivitiesResponse = {
  activities: Activity[]
}
type GetActivityByIdResponse = {
  activityById: Activity
}
type GetActivityByWikiResponse = {
  activitiesByWikId: Activity[]
}
type GetLatestActivityByWikiResponse = {
  activitiesByWikId: [
    {
      ipfs: string
    },
  ]
}

type ActivitiesArg = {
  limit?: number
  offset?: number
}

type WikiCreatorAndEditor = {
  user: User
  author: User
}

type WikiCreatorAndEditorResponse = {
  wiki: WikiCreatorAndEditor
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
    getLatestActivities: builder.query<Activity[], ActivitiesArg>({
      query: ({ offset, limit }: ActivitiesArg) => ({
        document: GET_ACTIVITIES,
        variables: { offset, limit },
      }),
      transformResponse: (response: GetActivitiesResponse) =>
        response.activities,
    }),
    getActivityById: builder.query<Activity, string>({
      query: (id: string) => ({
        document: GET_ACTIVITIES_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetActivityByIdResponse) =>
        response.activityById,
    }),
    getWikiByActivityId: builder.query<Wiki, string>({
      query: (id: string) => ({
        document: GET_WIKI_BY_ACTIVITY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetActivityByIdResponse) =>
        response.activityById.content[0],
    }),
    getWikiCreatorAndEditorByActivityId: builder.query<
      WikiCreatorAndEditor,
      string
    >({
      query: (id: string) => ({
        document: GET_WIKI_CREATOR_AND_EDITOR_BY_ACTIVITY_ID,
        variables: { id },
      }),
      transformResponse: (response: WikiCreatorAndEditorResponse) =>
        response.wiki,
    }),
    getLatestIPFSByWiki: builder.query<string, string>({
      query: (wikiId: string) => ({
        document: GET_LATEST_ACTIVITY_BY_WIKI,
        variables: { wikiId },
      }),
      transformResponse: (response: GetLatestActivityByWikiResponse) =>
        response.activitiesByWikId[0].ipfs,
    }),
    getActivityByWiki: builder.query<Activity[], string>({
      query: (id: string) => ({
        document: GET_ACTIVITIES_BY_WIKI,
        variables: { id },
      }),
      transformResponse: (response: GetActivityByWikiResponse) =>
        response.activitiesByWikId,
    }),
  }),
})

export const {
  useGetLatestActivitiesQuery,
  useGetActivityByWikiQuery,
  useGetActivityByIdQuery,
  useGetLatestIPFSByWikiQuery,
  useGetWikiByActivityIdQuery,
  util: { getRunningOperationPromises },
} = activitiesApi

export const {
  getLatestActivities,
  getActivityByWiki,
  getLatestIPFSByWiki,
  getActivityById,
  getWikiByActivityId,
  getWikiCreatorAndEditorByActivityId,
} = activitiesApi.endpoints
