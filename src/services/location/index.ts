import { HYDRATE } from 'next-redux-wrapper'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const locationApi = createApi({
  reducerPath: 'locationApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ipapi.co/json/',
  }),
  refetchOnMountOrArgChange: 60,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getIpDetails: builder.query<string, void>({
      query: () => '',
      transformResponse: (response: any) => {
        console.log(response)
        if (response) {
          return response?.country_name
        }
        return undefined
      },
    }),
  }),
})

export const { useGetIpDetailsQuery } = locationApi

export const { getIpDetails } = locationApi.endpoints
