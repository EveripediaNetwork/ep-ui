import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { HYDRATE } from 'next-redux-wrapper'
import { GET_TAGS_BY_ID } from './queries'

export type GlossaryTagWiki = {
  id: string
  wikis: { id: string; title: string; summary: string }
}

type GetTagByIdResponse = {
  tagsById: GlossaryTagWiki[]
}

type TagsQueryParams = {
  id: string
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
    getTagsById: builder.query<GlossaryTagWiki[], TagsQueryParams>({
      query: ({ id }: { id: string }) => ({
        document: GET_TAGS_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetTagByIdResponse) => response.tagsById,
    }),
  }),
})

export const {
  useGetTagsByIdQuery,
  util: { getRunningOperationPromises },
} = glossaryApi

export const { getTagsById } = glossaryApi.endpoints
