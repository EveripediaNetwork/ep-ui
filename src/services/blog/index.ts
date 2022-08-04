import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  FETCH_PUBLICATION_INFO,
  FETCH_SINGLE_TRANSACTION,
  FETCH_TRANSACTIONS,
} from './queries'

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
    getPublicationInfo: builder.query<any, string>({
      query: (publicationAddress: string) => ({
        document: FETCH_PUBLICATION_INFO,
        variables: { publicationAddress },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
})

export const ArweaveApi = createApi({
  reducerPath: 'arweave',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://arweave.net/graphql',
  }),
  endpoints: builder => ({
    getBlogEntries: builder.query<any, any>({
      query: (addresses: Array<string>) => ({
        document: FETCH_TRANSACTIONS,
        variables: { addresses },
      }),
      transformResponse: (response: any) => response,
    }),
    getSingleBlogEntry: builder.query<any, any>({
      query: (digest: string) => ({
        document: FETCH_SINGLE_TRANSACTION,
        variables: { digest },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
})

export const {
  useGetPublicationInfoQuery,
  // util: { getRunningOperationPromises },
} = MirrorApi

export const { getPublicationInfo } = MirrorApi.endpoints

export const {
  useGetBlogEntriesQuery,
  useGetSingleBlogEntryQuery,
  util: { getRunningOperationPromises },
} = ArweaveApi

export const { getBlogEntries, getSingleBlogEntry } = ArweaveApi.endpoints
