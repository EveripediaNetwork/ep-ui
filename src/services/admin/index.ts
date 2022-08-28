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
  TOGGLE_USER,
} from '@/services/admin/queries'
import config from '@/config'
import {
  WikisModifiedCount,
  CreatedWikisCount,
  Editors,
  ToggleUser,
} from '@/types/admin'
import { Wiki } from '@/types/Wiki'
import { GET_WIKIS_BY_TITLE } from '@/services/search/queries'
import { GraphQLClient } from 'graphql-request'

export const adminApiClient = new GraphQLClient(config.graphqlUrl)

type WikisModifiedCountArgs = {
  startDate?: number
  endDate?: number
  interval?: string
}

type ToggleUserArgs = {
  id: string
  active: boolean
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
  wikisByTitle: CreatedWikisCount[]
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
  baseQuery: graphqlRequestBaseQuery({ client: adminApiClient }),
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
    toggleUser: builder.mutation<ToggleUser, ToggleUserArgs>({
      query: ({ id, active }) => ({
        document: TOGGLE_USER,
        variables: { id, active },
      }),
    }),
    getSearchedWikisByTitle: builder.query<CreatedWikisCount[], string>({
      query: (title: string) => ({
        document: GET_WIKIS_BY_TITLE,
        variables: { title },
      }),
      transformResponse: (response: CreatedWikiCountResponse) =>
        response.wikisByTitle,
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
  useGetSearchedWikisByTitleQuery,
  useGetEditorsCountQuery,
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
  usePostHideWikiMutation,
  useToggleUserMutation,
  useGetSearchedEditorsQuery,
  util: { getRunningOperationPromises },
} = adminApi

export const {
  getAllCreatedWikiCount,
  getWikisCreatedCount,
  getSearchedWikisByTitle,
  getWikisEditedCount,
  getEditors,
  getEditorsCount,
  toggleUser,
  postHideWiki,
  getSearchedEditors,
} = adminApi.endpoints
