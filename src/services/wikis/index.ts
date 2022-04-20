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
} from '@/services/wikis/queries'
import { Wiki, WikiPreview } from '@/types/Wiki'
import config from '@/config'

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
    getWiki: builder.query<Wiki, string>({
      query: (id: string) => ({ document: GET_WIKI_BY_ID, variables: { id } }),
      transformResponse: (response: GetWikiResponse) => response.wiki,
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
    postImage: builder.mutation<string, { file: any }>({
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
  useGetTagWikisQuery,
  util: { getRunningOperationPromises },
} = wikiApi

export const {
  getWikis,
  getPromotedWikis,
  getWiki,
  getWikiPreview,
  getUserWikis,
  getWikisByCategory,
  getTagWikis,
  postWiki,
  postImage,
} = wikiApi.endpoints
