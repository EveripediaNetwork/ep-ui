import config from '@/config'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import { GET_EVENTS } from './queries'
import { Image } from '@everipedia/iq-utils'

export type TEvents = {
  id: string
  title: string
  location?: string
  summary: string
  events: { type: string; date: string }[]
  tags: { id: string }[]
  linkedWikis: {
    speakers: string[]
  }
  images: Image[]
}
type TGetEventResponse = {
  events: TEvents[]
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getEvents: builder.query<TEvents[], void>({
      query: () => ({ document: GET_EVENTS }),
      transformResponse: (response: TGetEventResponse) => response.events,
    }),
  }),
})

export const { useGetEventsQuery } = eventApi

export const { getEvents } = eventApi.endpoints
