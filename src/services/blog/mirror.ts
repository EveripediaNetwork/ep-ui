import { Blog } from '@/types/Blog'
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import { FETCH_BLOG, FETCH_BLOGS } from './queries'

type BlogsResponse = {
  entries: Blog[]
}

type BlogResponse = {
  entry: Blog
}

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
    requestHeaders: {
      Origin: 'https://mirror.xyz',
    },
  }),
  endpoints: builder => ({
    getBlogs: builder.query<Blog[], string>({
      query: (address: string) => ({
        document: FETCH_BLOGS,
        variables: { projectAddress: address },
      }),
      transformResponse: (response: BlogsResponse) => response.entries,
    }),
    getEntry: builder.query<BlogResponse, string>({
      query: (digest: string) => ({
        document: FETCH_BLOG,
        variables: { digest },
      }),
      transformResponse: (response: BlogResponse) => response,
    }),
  }),
})

export const { useGetBlogsQuery, useLazyGetBlogsQuery } = MirrorApi

export const { getBlogs, getEntry } = MirrorApi.endpoints
