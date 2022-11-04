import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_GLOSSARY_TAG_WIKIS } from './queries'
import config from '@/config'
import { HYDRATE } from 'next-redux-wrapper'
import { GraphQLClient } from 'graphql-request'

export type GlossaryWiki = {
  id: string
  wikis: { id: string; title: string; summary: string }
}

type GlossaryWikisResponseType = {
  glossaryWikis: GlossaryWiki[]
}

export const glossaryApiClient = new GraphQLClient(config.graphqlUrl)

export const glossaryApi = createApi({
  reducerPath: 'glossaryApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ client: glossaryApiClient }),
  endpoints: builder => ({
    getGlossaryWiki: builder.query<GlossaryWiki[], undefined>({
      query: () => ({
        document: GET_GLOSSARY_TAG_WIKIS,
      }),
      transformResponse: (response: GlossaryWikisResponseType) =>
        response.glossaryWikis,
    }),
  }),
})

export const {
  useGetGlossaryWikiQuery,
  util: { getRunningOperationPromises },
} = glossaryApi

export const { getGlossaryWiki } = glossaryApi.endpoints
