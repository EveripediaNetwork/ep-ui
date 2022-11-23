import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import config from '@/config'
import { BaseTag } from '@/types/Wiki'
import { GET_TAGS } from './queries'

type GetTagsResponse = {
  tagsPopular: BaseTag[]
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
    getTags: builder.query<BaseTag[], { startDate: number; endDate: number }>({
      query: ({ startDate, endDate }) => ({
        document: GET_TAGS,
        variables: {
          startDate,
          endDate,
        },
      }),
      transformResponse: (response: GetTagsResponse) => response.tagsPopular,
    }),
  }),
})

export const { useGetTagsQuery } = tagsApi

export const { getTags } = tagsApi.endpoints
