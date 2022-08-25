import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { Tag } from '@/types/Wiki'
import { GET_TAGS } from './queries'

type GetTagsResponse = {
  tags: Tag[]
}

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
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
    getTags: builder.query<Tag[], number>({
      query: (limit: number) => ({
        document: GET_TAGS,
        variables: { limit },
      }),
      transformResponse: (response: GetTagsResponse) => response.tags,
    }),
  }),
})

export const {
  useGetTagsQuery,
  util: { getRunningOperationPromises },
} = tagsApi

export const { getTags } = tagsApi.endpoints
