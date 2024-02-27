import config from '@/config'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { HYDRATE } from 'next-redux-wrapper'
import {
  GET_EVENTS,
  GET_EVENT_BY_CATEGORY_ID,
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

type TEventCategorySearchById = {
  categoryId: string
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
    getEventByCategoryId: builder.query<TEvents[], TEventCategorySearchById>({
      query: ({ categoryId }: TEventCategorySearchById) => {
        return {
          document: GET_EVENT_BY_CATEGORY_ID,
          variables: { categoryId },
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
  useGetEventByCategoryIdQuery,
} = eventApi

export const {
  getEvents,
  getPopularEvents,
  getEventByTitle,
  getEventByCategoryId,
} = eventApi.endpoints
