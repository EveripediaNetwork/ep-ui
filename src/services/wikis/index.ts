import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USER_WIKIS_BY_ID,
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
  GET_ACTIVITY_CARD_DETAILS,
} from '@/services/wikis/queries'
import {
  ActivityCardDetails,
  User,
  Wiki,
  WikiPreview,
} from '@everipedia/iq-utils'
import config from '@/config'
import { Activity } from '@/types/ActivityDataType'

type GetWikisResponse = {
  wikis: Wiki[]
}

type GetPromotedWikisResponse = {
  promotedWikis: Wiki[]
}

type GetWikiPreviewResponse = {
  wiki: WikiPreview
}
type GetWikiResponse = {
  wiki: Wiki
}

type GetUserWikiResponse = {
  userById: {
    wikis: Wiki[]
    wikisCreated: Activity[]
    wikisEdited: Activity[]
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
  endpoints: builder => ({
    getWikis: builder.query<Wiki[], void>({
      query: () => ({ document: GET_WIKIS }),
      transformResponse: (response: GetWikisResponse) => response.wikis,
    }),
    getPromotedWikis: builder.query<Wiki[], void>({
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
    getWikiActivityCardDetails: builder.query<ActivityCardDetails, string>({
      query: (id: string) => ({
        document: GET_ACTIVITY_CARD_DETAILS,
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
    getUserWikis: builder.query<Wiki[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => {
        return {
          document: GET_USER_WIKIS_BY_ID,
          variables: { id, limit, offset },
        }
      },
      transformResponse: (response: GetUserWikiResponse) =>
        response.userById.wikis,
    }),
    getUserCreatedWikis: builder.query<Activity[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => {
        return {
          document: GET_USER_CREATED_WIKIS_BY_ID,
          variables: { id, limit, offset },
        }
      },
      transformResponse: (response: GetUserWikiResponse) => {
        return response.userById.wikisCreated
      },
    }),
    getUserEditedWikis: builder.query<Activity[], WikiArg>({
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
      transformResponse: (response: GetWikisByTagResponse) =>
        response.tagById.wikis,
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
    postWiki: builder.mutation<string, { data: Partial<Wiki> }>({
      query: ({ data }) => ({
        document: POST_WIKI,
        variables: {
          data: JSON.stringify(data),
        },
      }),
      transformResponse: (response: PostWikiResponse) =>
        response.pinJSON.IpfsHash,
    }),
    postWikiViewCount: builder.mutation<number, string>({
      query: string => ({
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
  useGetUserWikisQuery,
  useGetWikisByCategoryQuery,
  useGetWikiPreviewsByCategoryQuery,
  useGetWikiActivityCardDetailsQuery,
  useGetTagWikisQuery,
  useGetUserCreatedWikisQuery,
  useGetUserEditedWikisQuery,
  useGetIsWikiSlugValidQuery,
  usePostWikiMutation,
  usePostFlagWikiMutation,
  usePostImageMutation,
  usePostWikiViewCountMutation,
} = wikiApi

export const {
  getWikis,
  getPromotedWikis,
  getWiki,
  getWikiCreatorAndEditor,
  getWikiPreview,
  getWikiActivityCardDetails,
  getWikiPreviewsByCategory,
  getUserWikis,
  getWikisByCategory,
  getTagWikis,
  postWiki,
  postWikiViewCount,
  postFlagWiki,
  postImage,
  getUserCreatedWikis,
  getUserEditedWikis,
  getIsWikiSlugValid,
} = wikiApi.endpoints
