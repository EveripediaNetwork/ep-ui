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
} from '@/services/wikis/queries'
import { Wiki } from '@/types/Wiki'
import config from '@/config'

type GetWikisResponse = {
  wikis: Wiki[]
}

type GetPromotedWikisResponse = {
  promotedWikis: Wiki[]
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

type PostWikiResponse = {
  pinJSON: {
    IpfsHash: string
  }
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
    getWiki: builder.query<Wiki, string>({
      query: (id: string) => ({ document: GET_WIKI_BY_ID, variables: { id } }),
      transformResponse: (response: GetWikiResponse) => response.wiki,
    }),
    getUserWikis: builder.query<Wiki[], string>({
      query: (id: string) => ({
        document: GET_USER_WIKIS_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetUserWikiResponse) =>
        response.userById.wikis,
    }),
    getWikisByCategory: builder.query<Wiki[], string>({
      query: (category: string) => ({
        document: GET_WIKIS_BY_CATEGORY,
        variables: { category },
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
  }),
})

export const {
  useGetWikisQuery,
  useGetPromotedWikisQuery,
  useGetWikiQuery,
  useGetUserWikisQuery,
  useGetWikisByCategoryQuery,
  util: { getRunningOperationPromises },
} = wikiApi

export const {
  getWikis,
  getPromotedWikis,
  getWiki,
  getUserWikis,
  getWikisByCategory,
  postWiki,
} = wikiApi.endpoints
