import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_WIKIS_BY_TITLE } from '@/services/nav-search/queries'
import config from '@/config'

export type WikiTitle = {
  id: string
  title: string
  content: string
  tags?: {
    id: string
  }[]
  images?: {
    id: string
  }[]
}

type GetWikisByTitleResponse = {
  wikisByTitle: WikiTitle[]
}

export const navSearchApi = createApi({
  reducerPath: 'navSearchApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getWikisByTitle: builder.query<WikiTitle[], string>({
      query: (title: string) => ({
        document: GET_WIKIS_BY_TITLE,
        variables: { title },
      }),
      transformResponse: (response: GetWikisByTitleResponse) =>
        response.wikisByTitle,
    }),
  }),
})

export const {
  useGetWikisByTitleQuery,
  util: { getRunningOperationPromises },
} = navSearchApi

export const { getWikisByTitle } = navSearchApi.endpoints
