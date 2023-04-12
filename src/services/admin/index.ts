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
  POST_PROMOTED_WIKI,
  TOGGLE_USER,
  PROMOTED_WIKIS_TABLE,
  HIDDEN_WIKIS_TABLE,
  HIDDEN_EDITORS_TABLE,
  UNHIDE_WIKI,
  GET_PAGE_COUNT,
  CHECK_ADMIN,
  REVALIDATE_URL,
  CONTENT_FEEDBACK,
} from '@/services/admin/queries'
import config from '@/config'
import {
  WikisModifiedCount,
  CreatedWikisCount,
  Editors,
  ToggleUser,
  ContentFeedbackArgs,
} from '@/types/admin'
import { Wiki } from '@everipedia/iq-utils'
import { GET_WIKIS_BY_TITLE } from '@/services/search/queries'
import { GraphQLClient } from 'graphql-request'

export const adminApiClient = new GraphQLClient(config.graphqlUrl)

type WikisModifiedCountArgs = {
  startDate?: number
  endDate?: number
  interval?: string
}
type EditorsModifiedCountArgs = {
  startDate?: number
}

type PageViewCountArgs = {
  startDate?: number
}
type PageViewsCountResponse = {
  pageViewsCount: { amount: number }
}
type ToggleUserArgs = {
  id: string
  active: boolean
}

type PromoteWikiArgs = {
  id: string
  level: number
}

type WikisEditedCountResponse = {
  wikisEdited: WikisModifiedCount[]
}

type RevalidateURL = {
  revalidatePage: boolean
}

type ContentFeedback = {
  contentFeedback: boolean
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
  promotedWikis: CreatedWikisCount[]
  wikisHidden: CreatedWikisCount[]
}
type PostHideWikiResponse = {
  hideWiki: {
    Wiki: Wiki
  }
  unhideWiki: {
    Wiki: Wiki
  }
}

type PostPromoteWikiResponse = {
  promoteWiki: {
    Wiki: Wiki
  }
}
type EditorsRes = {
  users: Editors[]
}

type HiddenEditorsRes = {
  usersHidden: Editors[]
}
type SearchedEditorQueryParams = {
  id?: string
  username?: string
}

type SearchedEditorsRes = {
  getProfileLikeUsername: Editors[]
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
  endpoints: (builder) => ({
    getEditorsCount: builder.query<
      { amount: number },
      EditorsModifiedCountArgs
    >({
      query: ({ startDate }: EditorsModifiedCountArgs) => ({
        document: EDITORS_COUNT,
        variables: { startDate },
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
    getPageViewCount: builder.query<{ amount: number }, PageViewCountArgs>({
      query: ({ startDate }: PageViewCountArgs) => ({
        document: GET_PAGE_COUNT,
        variables: { startDate },
      }),
      transformResponse: (response: PageViewsCountResponse) =>
        response.pageViewsCount,
    }),
    getHiddenEditors: builder.query<Editors[], number>({
      query: (offset: number) => ({
        document: HIDDEN_EDITORS_TABLE,
        variables: { offset },
      }),
      transformResponse: (response: HiddenEditorsRes) => response.usersHidden,
    }),
    checkIsAdmin: builder.query<boolean, undefined>({
      query: () => ({
        document: CHECK_ADMIN,
      }),
      transformResponse: (response: { isAdmin: boolean }) => response.isAdmin,
    }),
    getAllCreatedWikiCount: builder.query<CreatedWikisCount[], number>({
      query: (offset: number) => ({
        document: CREATED_WIKIS_TABLE,
        variables: { offset },
      }),
      transformResponse: (response: CreatedWikiCountResponse) => response.wikis,
    }),
    getAllPromotedWikiCount: builder.query<CreatedWikisCount[], number>({
      query: (offset: number) => ({
        document: PROMOTED_WIKIS_TABLE,
        variables: { offset },
      }),
      transformResponse: (response: CreatedWikiCountResponse) =>
        response.promotedWikis,
    }),

    getAllHiddenWikiCount: builder.query<CreatedWikisCount[], number>({
      query: (offset: number) => ({
        document: HIDDEN_WIKIS_TABLE,
        variables: { offset },
      }),
      transformResponse: (response: CreatedWikiCountResponse) =>
        response.wikisHidden,
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
      transformResponse: (response: PostHideWikiResponse) =>
        response.hideWiki.Wiki,
    }),
    revalidateURL: builder.mutation<boolean, string>({
      query: (route: string) => ({
        document: REVALIDATE_URL,
        variables: { route },
      }),
      transformResponse: (response: RevalidateURL) => {
        return response.revalidatePage
      },
    }),
    contentFeedback: builder.mutation<boolean, ContentFeedbackArgs>({
      query: ({ contentId, userId, feedback }: ContentFeedbackArgs) => ({
        document: CONTENT_FEEDBACK,
        variables: { contentId, userId, feedback },
      }),
      transformResponse: (response: ContentFeedback) => {
        return response.contentFeedback
      },
    }),
    postUnHideWiki: builder.mutation<Wiki, string>({
      query: (id: string) => ({
        document: UNHIDE_WIKI,
        variables: { id },
      }),
      transformResponse: (response: PostHideWikiResponse) =>
        response.unhideWiki.Wiki,
    }),
    getSearchedEditors: builder.query<Editors[], SearchedEditorQueryParams>({
      query: ({ id, username }: { id: string; username: string }) => ({
        document: SEARCHED_EDITORS,
        variables: { id, username },
      }),
      transformResponse: (response: SearchedEditorsRes) =>
        response.getProfileLikeUsername,
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
    postPromotedWiki: builder.mutation<Wiki, PromoteWikiArgs>({
      query: ({ id, level }) => {
        return {
          document: POST_PROMOTED_WIKI,
          variables: { id, level },
        }
      },
      transformResponse: (response: PostPromoteWikiResponse) =>
        response.promoteWiki.Wiki,
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
  usePostPromotedWikiMutation,
  useToggleUserMutation,
  usePostUnHideWikiMutation,
  useGetSearchedEditorsQuery,
  useGetAllHiddenWikiCountQuery,
  useGetAllPromotedWikiCountQuery,
  useGetHiddenEditorsQuery,
  useGetPageViewCountQuery,
  useCheckIsAdminQuery,
  useRevalidateURLMutation,
  useContentFeedbackMutation,
} = adminApi

export const {
  checkIsAdmin,
  revalidateURL,
  contentFeedback,
  getAllCreatedWikiCount,
  getAllHiddenWikiCount,
  getAllPromotedWikiCount,
  getWikisCreatedCount,
  getSearchedWikisByTitle,
  getWikisEditedCount,
  getEditors,
  getEditorsCount,
  toggleUser,
  postHideWiki,
  getPageViewCount,
  getHiddenEditors,
  postUnHideWiki,
  postPromotedWiki,
  getSearchedEditors,
} = adminApi.endpoints
