import config from '@/config'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import {
  GET_EVENTS,
  GET_EVENTS_BY_BLOCKCHAIN,
  GET_EVENT_BY_TITLE,
  GET_POPULAR_EVENTS,
} from './queries'
import { Image } from '@everipedia/iq-utils'

export type TEvents = {
  id: string
  title: string
  location?: string
  summary?: string
  events: { type: string; date: string }[]
  tags: { id: string }[]
  linkedWikis?: {
    speakers: string[]
  }
  images: Image[]
}

type TEventArg = {
  limit?: number
  offset?: number
  ids?: string[]
}

type TGetEventResponse = {
  events: TEvents[]
}

type TGetPopularEventResponse = {
  popularEvents: TEvents[]
}

type TGetWikiByEventResponse = {
  wikiEventsByTitle: TEvents[]
}
type TGetEventByCategoryIdResponse = {
  wikiEventsByCategory: TEvents[]
}

type TEventSearch = {
  title: string
}

type TEventByBlockchain = {
  blockchain: string
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
    getEvents: builder.query<TEvents[], TEventArg>({
      query: ({ offset, limit, ids }: TEventArg) => ({
        document: GET_EVENTS,
        variables: { offset, limit, ids },
      }),
      transformResponse: (response: TGetEventResponse) => response.events,
    }),
    getPopularEvents: builder.query<TEvents[], void>({
      query: () => ({ document: GET_POPULAR_EVENTS }),
      transformResponse: (response: TGetPopularEventResponse) =>
        response.popularEvents,
    }),
    getEventByTitle: builder.query<TEvents[], TEventSearch>({
      query: ({ title }: TEventSearch) => {
        return {
          document: GET_EVENT_BY_TITLE,
          variables: { title },
        }
      },
      transformResponse: (response: TGetWikiByEventResponse) =>
        response.wikiEventsByTitle,
    }),
    getEventByBlockchain: builder.query<TEvents[], TEventByBlockchain>({
      query: ({ blockchain }: TEventByBlockchain) => {
        return {
          document: GET_EVENTS_BY_BLOCKCHAIN,
          variables: { blockchain },
        }
      },
      transformResponse: (response: TGetEventByCategoryIdResponse) =>
        response.wikiEventsByCategory,
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetPopularEventsQuery,
  useGetEventByTitleQuery,
  useGetEventByBlockchainQuery,
} = eventApi

export const {
  getEvents,
  getPopularEvents,
  getEventByTitle,
  getEventByBlockchain,
} = eventApi.endpoints
