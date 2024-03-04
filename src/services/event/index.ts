import config from '@/config'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import {
  GET_EVENTS,
  GET_EVENTS_BY_BLOCKCHAIN,
  GET_EVENTS_BY_TAGS,
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
  tagIds?: string[]
  startDate?: string
  endDate?: string
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
type TEventByBlockchain = {
  eventsByBlockchain: TEvents[]
}

type TEventSearch = {
  title: string
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
      query: ({ offset, limit }: TEventArg) => {
        return {
          document: GET_EVENTS,
          variables: { offset, limit },
        }
      },
      transformResponse: (response: TGetEventResponse) => response.events,
    }),
    getEventsByTags: builder.query<TEvents[], TEventArg>({
      query: ({ tagIds, startDate, endDate }: TEventArg) => ({
        document: GET_EVENTS_BY_TAGS,
        variables: { tagIds, startDate, endDate },
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
    getEventByBlockchain: builder.query<TEvents[], string>({
      query: (blockchain: string) => {
        return {
          document: GET_EVENTS_BY_BLOCKCHAIN,
          variables: { blockchain },
        }
      },
      transformResponse: (response: TEventByBlockchain) =>
        response.eventsByBlockchain,
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetPopularEventsQuery,
  useGetEventByTitleQuery,
  useGetEventByBlockchainQuery,
  useGetEventsByTagsQuery,
} = eventApi

export const {
  getEvents,
  getPopularEvents,
  getEventByTitle,
  getEventByBlockchain,
  getEventsByTags,
} = eventApi.endpoints
