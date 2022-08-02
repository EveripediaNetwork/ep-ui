import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { FETCH_PUBLICATIONS } from './queries'

export const MirrorApi = createApi({
  reducerPath: 'mirror',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://mirror-api.com/graphql',
    requestHeaders: { origin: 'https://mirror.xyz' },
  }),
  endpoints: builder => ({
    getBlogEntries: builder.query<any, string>({
      query: (publicationAddress: string) => ({
        document: FETCH_PUBLICATIONS,
        variables: { publicationAddress },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
})

export const {
  useGetBlogEntriesQuery,
  util: { getRunningOperationPromises },
} = MirrorApi

export const { getBlogEntries } = MirrorApi.endpoints
