import config from '@/config'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import {
  GET_EVENTS,
  GET_EVENTS_BY_BLOCKCHAIN,
  GET_EVENTS_BY_LOCATION,
  GET_EVENTS_BY_TAGS,
  GET_EVENT_BY_TITLE,
  GET_POPULAR_EVENTS,
} from './queries'
import { Image, MData } from '@everipedia/iq-utils'

export type TEventsDate = {
  type: string
  date: string | null
  multiDateStart: string | null
  multiDateEnd: string | null
}

export type TEvents = {
  id: string
  title: string
  location?: string
  summary?: string
  events: TEventsDate[]
  tags: { id: string }[]
  speakerWikis?: {
    id: string
    images: Image[]
  }[]
  images: Image[]
  metadata?: MData[]
}

type TEventArg = {
  limit?: number
  offset?: number
  tagIds?: string[]
  startDate?: string
  direction?: string
  endDate?: string
  order?: string
}

type TEventByBlockchainArg = {
  blockchain: string
  startDate?: string
  endDate?: string
}

type TEventByLocationArg = {
  location: string
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

type TEventByLocation = {
  eventsByLocation: TEvents[]
}

type TEventSearch = {
  title: string
  startDate?: string
  endDate?: string
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
      query: ({ offset, limit, startDate }: TEventArg) => {
        return {
          document: GET_EVENTS,
          variables: { offset, limit, startDate },
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
    getPopularEvents: builder.query<TEvents[], { startDate?: string }>({
      query: ({ startDate }) => ({
        document: GET_POPULAR_EVENTS,
        variables: { startDate },
      }),
      transformResponse: (response: TGetPopularEventResponse) =>
        response.popularEvents,
    }),
    getEventByTitle: builder.query<TEvents[], TEventSearch>({
      query: ({ title, startDate, endDate }: TEventSearch) => {
        return {
          document: GET_EVENT_BY_TITLE,
          variables: { title, startDate, endDate },
        }
      },
      transformResponse: (response: TGetWikiByEventResponse) =>
        response.wikiEventsByTitle,
    }),
    getEventByBlockchain: builder.query<TEvents[], TEventByBlockchainArg>({
      query: ({ blockchain, startDate, endDate }: TEventByBlockchainArg) => {
        return {
          document: GET_EVENTS_BY_BLOCKCHAIN,
          variables: { blockchain, startDate, endDate },
        }
      },
      transformResponse: (response: TEventByBlockchain) =>
        response.eventsByBlockchain,
    }),
    getEventByLocation: builder.query<TEvents[], TEventByLocationArg>({
      query: ({ location, startDate, endDate }: TEventByLocationArg) => {
        return {
          document: GET_EVENTS_BY_LOCATION,
          variables: { country: location, startDate, endDate },
        }
      },
      transformResponse: (response: TEventByLocation) =>
        response.eventsByLocation,
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetPopularEventsQuery,
  useGetEventByTitleQuery,
  useGetEventByBlockchainQuery,
  useGetEventsByTagsQuery,
  useGetEventByLocationQuery,
} = eventApi

export const {
  getEvents,
  getPopularEvents,
  getEventByTitle,
  getEventByBlockchain,
  getEventsByTags,
  getEventByLocation,
} = eventApi.endpoints
