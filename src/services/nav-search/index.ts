import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_WIKIS_BY_TITLE } from '@/services/nav-search/queries'
// import { Category, CategoryLink } from '@/types/CategoryDataTypes'
import config from '@/config'

type Wiki = {
  id: string
}

type GetWikiTitleByIdResponse = {
  wikiTitleById: Wiki[]
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
    getWikisTitleById: builder.query<Wiki[], string>({
      query: (id: string) => ({
        document: GET_WIKIS_BY_TITLE,
        variables: { id },
      }),
      transformResponse: (response: GetWikiTitleByIdResponse) =>
        response.wikiTitleById,
    }),
  }),
})

export const {
  useGetWikisTitleByIdQuery,
  util: { getRunningOperationPromises },
} = navSearchApi

export const { getWikisTitleById } = navSearchApi.endpoints
