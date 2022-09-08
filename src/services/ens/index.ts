import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ENSData {
  address: string
  name: string
  displayName: string
  avatar: string
}

export const ensApi = createApi({
  reducerPath: 'ensApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: builder => ({
    getEns: builder.query<ENSData, string>({
      query: (address: string) => ({ url: `/ens/${address}` }),
    }),
  }),
})

export const {
  useGetEnsQuery,
  util: { getRunningOperationPromises },
} = ensApi

export const { getEns } = ensApi.endpoints
