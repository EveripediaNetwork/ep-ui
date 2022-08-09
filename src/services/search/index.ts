import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_CATEGORIES_BY_TITLE,
  GET_WIKIS_BY_TITLE,
  GET_USERNAME_BY_TITLE,
} from '@/services/search/queries'
import config from '@/config'
import { WikiPreview } from '@/types/Wiki'

export type Category = {
  id: string
  title: string
  description: string
  cardImage: string
  heroImage: string
  icon: string
}
export type Username = {
  id: string
  username: string
  bio: string
  avatar: string
}
type UsernameArgs = {
  id: string
  username: string
}
type GetWikisByTitleResponse = {
  wikisByTitle: WikiPreview[]
}

type GetCategoriesByTitleResponse = {
  categoryByTitle: Category[]
}

type GetUsernamesByTitleResponse = {
  getProfileLikeUsername: Username[]
}

export const navSearchApi = createApi({
  reducerPath: 'navSearchApi',
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getWikisByTitle: builder.query<WikiPreview[], string>({
      query: (title: string) => ({
        document: GET_WIKIS_BY_TITLE,
        variables: { title },
      }),
      transformResponse: (response: GetWikisByTitleResponse) =>
        response.wikisByTitle,
    }),
    getCategoriesByTitle: builder.query<Category[], string>({
      query: (title: string) => ({
        document: GET_CATEGORIES_BY_TITLE,
        variables: { title },
      }),
      transformResponse: (response: GetCategoriesByTitleResponse) =>
        response.categoryByTitle,
    }),
    getUsernamesByTitle: builder.query<Username[], UsernameArgs>({
      query: ({ id, username }) => ({
        document: GET_USERNAME_BY_TITLE,
        variables: { id, username },
      }),
      transformResponse: (response: GetUsernamesByTitleResponse) =>
        response.getProfileLikeUsername,
    }),
  }),
})

export const {
  useGetWikisByTitleQuery,
  useGetCategoriesByTitleQuery,
  useGetUsernamesByTitleQuery,
  util: { getRunningOperationPromises },
} = navSearchApi

export const { getWikisByTitle, getCategoriesByTitle, getUsernamesByTitle } =
  navSearchApi.endpoints
