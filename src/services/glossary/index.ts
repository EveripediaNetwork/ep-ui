import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { HYDRATE } from 'next-redux-wrapper'
import { Wiki } from '@/types/Wiki'
import { GET_TAG_WIKIS_BY_ID } from '../wikis/queries'
import { GET_GLOSSARY_TAGS } from '../tags/queries'

export type GlossaryTagWiki = {
  id: string
  wikis: { id: string; title: string; summary: string }
}

export type Tags = {
  id: string
  wikis: { id: string; title: string }[]
}

type GetGlossaryWikisByTagResponse = {
  tagById: { wikis: Wiki[] }
}

type WikiArg = {
  id: string
  limit?: number
  offset?: number
}

type GetTagsResponse = {
  tagsPopular: Tags[]
}

export const glossaryApi = createApi({
  reducerPath: 'glossaryApi',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },

  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getGlossaryTagWikis: builder.query<Wiki[], WikiArg>({
      query: ({ id, limit, offset }: WikiArg) => ({
        document: GET_TAG_WIKIS_BY_ID,
        variables: { id, limit, offset },
      }),
      transformResponse: (response: GetGlossaryWikisByTagResponse) =>
        response.tagById.wikis,
    }),
    getTags: builder.query<Tags[], { startDate: number; endDate: number }>({
      query: ({ startDate, endDate }) => ({
        document: GET_GLOSSARY_TAGS,
        variables: {
          startDate,
          endDate,
        },
      }),
      transformResponse: (response: GetTagsResponse) => response.tagsPopular,
    }),
  }),
})

export const {
  useGetGlossaryTagWikisQuery,
  useGetTagsQuery,
  util: { getRunningOperationPromises },
} = glossaryApi

export const { getGlossaryTagWikis, getTags } = glossaryApi.endpoints
