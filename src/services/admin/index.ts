import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  WIKIS_EDITED,
  WIKIS_CREATED,
  CREATED_WIKIS_TABLE,
  EDITORS_TABLE,
  EDITORS_COUNT,
  HIDE_WIKI,
  SEARCHED_EDITORS,
} from '@/services/admin/queries'
import config from '@/config'
import { WikisModifiedCount, CreatedWikisCount, Editors } from '@/types/admin'
import { Wiki } from '@/types/Wiki'

type WikisModifiedCountArgs = {
  startDate?: number
  endDate?: number
  interval?: string
}

type WikisEditedCountResponse = {
  wikisEdited: WikisModifiedCount[]
}

type WikisEditorsCountResponse = {
  editorCount: { amount: number }
}
type WikisCreatedCountResponse = {
  wikisCreated: WikisModifiedCount[]
}
type CreatedWikiCountResponse = {
  wikis: CreatedWikisCount[]
}

type EditorsRes = {
  users: Editors[]
}

type SearchedEditorQueryParams = {
  id: string
}

type SearchedEditorsRes = {
  usersById: Editors[]
}

type EditorQueryParams = {
  limit: number
  offset: number
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
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
    getEditorsCount: builder.query<{ amount: number }, WikisModifiedCountArgs>({
      query: ({ startDate, endDate, interval }: WikisModifiedCountArgs) => ({
        document: EDITORS_COUNT,
        variables: { startDate, endDate, interval },
      }),
      transformResponse: (response: WikisEditorsCountResponse) =>
        response.editorCount,
    }),
    getEditors: builder.query<Editors[], EditorQueryParams>({
      query: ({ limit, offset }: { limit: number; offset: number }) => ({
        document: EDITORS_TABLE,
        variables: { limit, offset },
      }),
      transformResponse: (response: EditorsRes) => response.users,
    }),
    getAllCreatedWikiCount: builder.query<CreatedWikisCount[], number>({
      query: (offset: number) => ({
        document: CREATED_WIKIS_TABLE,
        variables: { offset },
      }),
      transformResponse: (response: CreatedWikiCountResponse) => response.wikis,
    }),
    getWikisEditedCount: builder.query<
      WikisModifiedCount[],
      WikisModifiedCountArgs
    >({
      query: ({ startDate, endDate, interval }: WikisModifiedCountArgs) => ({
        document: WIKIS_EDITED,
        variables: { startDate, endDate, interval },
      }),
      transformResponse: (response: WikisEditedCountResponse) =>
        response.wikisEdited,
    }),
    postHideWiki: builder.mutation<Wiki, string>({
      query: (id: string) => ({
        document: HIDE_WIKI,
        variables: { id },
      }),
    }),
    getSearchedEditors: builder.query<Editors[], SearchedEditorQueryParams>({
      query: ({ id }: { id: string }) => ({
        document: SEARCHED_EDITORS,
        variables: { id },
      }),
      transformResponse: (response: SearchedEditorsRes) => response.usersById,
    }),
    getWikisCreatedCount: builder.query<
      WikisModifiedCount[],
      WikisModifiedCountArgs
    >({
      query: ({ startDate, endDate, interval }: WikisModifiedCountArgs) => ({
        document: WIKIS_CREATED,
        variables: { startDate, endDate, interval },
      }),
      transformResponse: (response: WikisCreatedCountResponse) =>
        response.wikisCreated,
    }),
  }),
})

export const {
  useGetAllCreatedWikiCountQuery,
  useGetEditorsQuery,
  useGetEditorsCountQuery,
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
  usePostHideWikiMutation,
  useGetSearchedEditorsQuery,
  util: { getRunningOperationPromises },
} = adminApi

export const {
  getAllCreatedWikiCount,
  getWikisCreatedCount,
  getWikisEditedCount,
  getEditors,
  getEditorsCount,
  postHideWiki,
  getSearchedEditors,
} = adminApi.endpoints
