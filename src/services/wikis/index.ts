import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_WIKI_BY_ID,
  GET_WIKIS,
  GET_WIKIS_BY_CATEGORY,
  GET_PROMOTED_WIKIS,
  POST_WIKI,
  POST_IMG,
  GET_PREVIEW_WIKI_BY_ID,
  GET_TAG_WIKIS_BY_ID,
  GET_USER_CREATED_WIKIS_BY_ID,
  GET_USER_EDITED_WIKIS_BY_ID,
  GET_WIKI_SLUG_VALID,
  POST_WIKI_VIEW_COUNT,
  GET_WIKI_CREATOR_AND_EDITOR,
  GET_WIKI_PREVIEWS_BY_CATEGORY,
  POST_FLAG_WIKI,
  GET_TRENDING_WIKIS,
  GET_TRENDING_CATEGORY_WIKIS,
  GET_WIKI_ACTIVITY_BY_CATEGORIES,
} from '@/services/wikis/queries'
import type { User, Wiki, WikiPreview, WikiBuilder } from '@everipedia/iq-utils'
import config from '@/config'
import type { ActivityBuilder } from '@/types/ActivityDataType'
import type { CommonUser } from '@/types/wiki'

export type RecentWikisBuilder = WikiBuilder<
  {
    user: CommonUser
  },
  'title' | 'summary' | 'images' | 'id'
>

type GetRecentWikisResponse = {
  wikis: RecentWikisBuilder[]
}

export type PromotedWikisBuilder = WikiBuilder<
  { user: CommonUser },
  'title' | 'summary' | 'images' | 'id' | 'updated' | 'promoted'
>

type GetPromotedWikisResponse = {
  promotedWikis: PromotedWikisBuilder[]
}

type GetWikiPreviewResponse = {
  wiki: WikiPreview
}

type GetWikiResponse = {
  wiki: Wiki
}

type UserWikiBuilder = WikiBuilder<
  {
    user: CommonUser
  },
  'title' | 'summary' | 'images' | 'updated'
>

export type UserActivity = ActivityBuilder<
  {
    content: {
      title: string
      id: string
      summary: string
      user: User
      tags: {
        id: string
      }[]
      categories: {
        id: string
        title: string
      }[]
      images: {
        id: string
        title: string
        type: string
      }[]
      updated: string
    }[]
  },
  'datetime' | 'id' | 'wikiId' | 'type'
>

type GetUserWikiResponse = {
  userById: {
    wikis: UserWikiBuilder[]
    wikisCreated: UserActivity[]
    wikisEdited: UserActivity[]
  }
}

type GetWikisByCategoryResponse = {
  wikisByCategory: Wiki[]
}

type GetWikisByTagResponse = {
  tagById: { wikis: Wiki[] }
}

type PostWikiResponse = {
  pinJSON: {
    IpfsHash: string
  }
}
type PostWikiViewCountResponse = {
  wikiViewCount: number
}
type WikiArg = {
  id: string
  limit?: number
  offset?: number
}

type WikisByCategoryArg = {
  category: string
  limit?: number
  offset?: number
}

type GetIsWikiSlugValidResponse = {
  validWikiSlug: {
    valid?: boolean
    id?: string
  }
}

type WikiCreatorAndEditor = {
  user: User
  author: User
}
type WikiCreatorAndEditorResponse = {
  wiki: WikiCreatorAndEditor
}

type FlagWikiArgs = {
  report: string
  wikiId: string
  userId: string
}

type PostFlagWikiResponse = {
  flagWiki: boolean
}

type TrendingWikisArgs = {
  amount: number
  startDay: string
  endDay: string
}

type TrendingCategoryWikisArgs = {
  amount: number
  startDay: string
  endDay: string
  category?: string
}

type ActivitiesByCategoryArgs = {
  limit: number
  offset: number
  type: string
  category?: string
}

type ActivitiesByCategoryData = {
  activitiesByCategory: {
    content: Wiki[]
  }[]
}

export const wikiApi = createApi({
  reducerPath: 'wikiApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getWikis: builder.query<RecentWikisBuilder[], void>({
      query: () => ({ document: GET_WIKIS }),
      transformResponse: (response: GetRecentWikisResponse) => response.wikis,
    }),
    getPromotedWikis: builder.query<PromotedWikisBuilder[], void>({
      query: () => ({ document: GET_PROMOTED_WIKIS }),
      transformResponse: (response: GetPromotedWikisResponse) =>
        response.promotedWikis,
    }),
    getWikiPreview: builder.query<WikiPreview, string>({
      query: (id: string) => ({
        document: GET_PREVIEW_WIKI_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetWikiPreviewResponse) => response.wiki,
    }),
    getWiki: builder.query<Wiki, string>({
      query: (id: string) => ({ document: GET_WIKI_BY_ID, variables: { id } }),
      transformResponse: (response: GetWikiResponse) => response.wiki,
    }),
    getWikiCreatorAndEditor: builder.query<WikiCreatorAndEditor, string>({
      query: (id: string) => ({
        document: GET_WIKI_CREATOR_AND_EDITOR,
        variables: { id },
      }),
      transformResponse: (response: WikiCreatorAndEditorResponse) =>
        response.wiki,
    }),
    getUserCreatedWikis: builder.query<UserActivity[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => {
        return {
          document: GET_USER_CREATED_WIKIS_BY_ID,
          variables: { id, limit, offset },
        }
      },
      transformResponse: (response: GetUserWikiResponse) => {
        if (response?.userById?.wikisCreated) {
          return response.userById.wikisCreated
        }
        return []
      },
    }),
    getUserEditedWikis: builder.query<UserActivity[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => {
        return {
          document: GET_USER_EDITED_WIKIS_BY_ID,
          variables: { id, limit, offset },
        }
      },
      transformResponse: (response: GetUserWikiResponse) => {
        return response.userById.wikisEdited
      },
    }),
    getIsWikiSlugValid: builder.query<{ valid?: boolean; id?: string }, string>(
      {
        query: (slug: string) => ({
          document: GET_WIKI_SLUG_VALID,
          variables: { slug },
        }),
        transformResponse: (response: GetIsWikiSlugValidResponse) =>
          response.validWikiSlug,
      },
    ),
    getTagWikis: builder.query<Wiki[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => ({
        document: GET_TAG_WIKIS_BY_ID,
        variables: { id, limit, offset },
      }),
      transformResponse: (response: GetWikisByTagResponse) => {
        if (!response?.tagById) return []
        return response.tagById.wikis
      },
    }),
    getWikisByCategory: builder.query<Wiki[], WikisByCategoryArg>({
      query: ({
        category,
        limit,
        offset,
      }: {
        category: string
        limit?: number
        offset?: number
      }) => ({
        document: GET_WIKIS_BY_CATEGORY,
        variables: { category, limit, offset },
      }),
      transformResponse: (response: GetWikisByCategoryResponse) =>
        response.wikisByCategory,
    }),
    getWikiPreviewsByCategory: builder.query<Wiki[], WikisByCategoryArg>({
      query: ({
        category,
        limit,
        offset,
      }: {
        category: string
        limit?: number
        offset?: number
      }) => ({
        document: GET_WIKI_PREVIEWS_BY_CATEGORY,
        variables: { category, limit, offset },
      }),
      transformResponse: (response: GetWikisByCategoryResponse) =>
        response.wikisByCategory,
    }),
    getTrendingWikis: builder.query<Wiki[], TrendingWikisArgs>({
      query: ({ amount, startDay, endDay }: TrendingWikisArgs) => ({
        document: GET_TRENDING_WIKIS,
        variables: { amount, startDay, endDay },
      }),
      transformResponse: (response: { wikisPerVisits: Wiki[] }) =>
        response.wikisPerVisits,
    }),
    getTrendingCategoryWikis: builder.query<
      { wikisPerVisits: Wiki[] },
      TrendingCategoryWikisArgs
    >({
      query: ({
        amount,
        startDay,
        endDay,
        category,
      }: TrendingCategoryWikisArgs) => ({
        document: GET_TRENDING_CATEGORY_WIKIS,
        variables: { amount, startDay, endDay, category },
      }),
    }),
    getWikiActivityByCategory: builder.query<Wiki[], ActivitiesByCategoryArgs>({
      query: ({ limit, offset, type, category }: ActivitiesByCategoryArgs) => ({
        document: GET_WIKI_ACTIVITY_BY_CATEGORIES,
        variables: { limit, offset, type, category },
      }),
      transformResponse: (response: ActivitiesByCategoryData) =>
        response.activitiesByCategory.map((activity) => activity.content[0]),
    }),
    postWiki: builder.mutation<string, { data: Partial<Wiki> }>({
      query: ({ data }) => {
        return {
          document: POST_WIKI,
          variables: {
            data: JSON.stringify(data),
          },
        }
      },
      transformResponse: (response: PostWikiResponse) =>
        response.pinJSON.IpfsHash,
    }),
    postWikiViewCount: builder.mutation<number, string>({
      query: (string) => ({
        document: POST_WIKI_VIEW_COUNT,
        variables: {
          id: string,
        },
      }),
      transformResponse: (response: PostWikiViewCountResponse) =>
        response.wikiViewCount,
    }),
    postFlagWiki: builder.mutation<boolean, FlagWikiArgs>({
      query: (flagWikiArgs: FlagWikiArgs) => {
        return {
          document: POST_FLAG_WIKI,
          variables: {
            report: flagWikiArgs.report,
            wikiId: flagWikiArgs.wikiId,
            userId: flagWikiArgs.userId,
          },
        }
      },
      transformResponse: (response: PostFlagWikiResponse) => response.flagWiki,
    }),
    postImage: builder.mutation<string, { file: unknown }>({
      query: ({ file }) => ({
        document: POST_IMG,
        variables: { file },
      }),
    }),
  }),
})

export const {
  useGetWikisQuery,
  useGetPromotedWikisQuery,
  useGetWikiQuery,
  useGetWikiPreviewQuery,
  useGetWikisByCategoryQuery,
  useGetWikiPreviewsByCategoryQuery,
  useGetTagWikisQuery,
  useGetUserCreatedWikisQuery,
  useGetUserEditedWikisQuery,
  useGetIsWikiSlugValidQuery,
  useGetTrendingWikisQuery,
  useGetTrendingCategoryWikisQuery,
  useGetWikiActivityByCategoryQuery,
  usePostFlagWikiMutation,
  usePostWikiMutation,
  usePostImageMutation,
  usePostWikiViewCountMutation,
} = wikiApi

export const {
  getWikis,
  getPromotedWikis,
  getWiki,
  getWikiCreatorAndEditor,
  getWikiPreview,
  getWikiPreviewsByCategory,
  getWikisByCategory,
  getTagWikis,
  postWiki,
  postFlagWiki,
  postWikiViewCount,
  postImage,
  getUserCreatedWikis,
  getUserEditedWikis,
  getIsWikiSlugValid,
  getTrendingWikis,
  getTrendingCategoryWikis,
  getWikiActivityByCategory,
} = wikiApi.endpoints
