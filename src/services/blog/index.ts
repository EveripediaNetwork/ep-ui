import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { RawTransactions } from '@/types/Blog'
import { FETCH_SINGLE_TRANSACTION, FETCH_TRANSACTIONS } from './queries'

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
    getBlogEntries: builder.query<RawTransactions, Array<string>>({
      query: (addresses: Array<string>) => ({
        document: FETCH_TRANSACTIONS,
        variables: { addresses },
      }),
      transformResponse: (response: RawTransactions): RawTransactions => {
        return response
      },
    }),
    getSingleBlogEntry: builder.query<RawTransactions, string>({
      query: (digest: string) => ({
        document: FETCH_SINGLE_TRANSACTION,
        variables: { digest },
      }),
      transformResponse: (response: RawTransactions) => response,
    }),
  }),
})

export const {
  useGetBlogEntriesQuery,
  useGetSingleBlogEntryQuery,
  util: { getRunningOperationPromises },
} = ArweaveApi

export const { getBlogEntries, getSingleBlogEntry } = ArweaveApi.endpoints
