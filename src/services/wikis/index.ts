import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USER_WIKIS_BY_ID,
  GET_WIKI_BY_ID,
  GET_WIKIS,
} from '@/services/wikis/queries'
import { Content, Wiki } from '@/types/Wiki'
import config from '@/config'

type GetWikisResponse = {
  wikis: Wiki[]
}

type GetWikiResponse = {
  wiki: Wiki
}

type GetUserWikiResponse = {
  user: {
    contents: Content[]
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
  baseQuery: graphqlRequestBaseQuery({ url: config.thegraph }),
  endpoints: builder => ({
    getWikis: builder.query<Wiki[], void>({
      query: () => ({ document: GET_WIKIS }),
      transformResponse: (response: GetWikisResponse) => response.wikis,
    }),
    getWiki: builder.query<Wiki, string>({
      query: (id: string) => ({ document: GET_WIKI_BY_ID, variables: { id } }),
      transformResponse: (response: GetWikiResponse) => response.wiki,
    }),
    getUserWikis: builder.query<Content[], string>({
      query: (id: string) => ({
        document: GET_USER_WIKIS_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetUserWikiResponse) =>
        response.user.contents,
    }),
  }),
})

export const {
  useGetWikisQuery,
  useGetWikiQuery,
  useGetUserWikisQuery,
  util: { getRunningOperationPromises },
} = wikiApi

export const { getWikis, getWiki, getUserWikis } = wikiApi.endpoints
