import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_ID,
} from '@/services/categories/queries'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import config from '@/config'

type GetCategoriesResponse = {
  categories: CategoryDataType
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  endpoints: builder => ({
    getCategories: builder.query<CategoryDataType, void>({
      query: () => ({ document: GET_CATEGORIES }),
      transformResponse: (response: GetCategoriesResponse) =>
        response.categories,
    }),
    getCategoriesById: builder.query<CategoryDataType, string>({
      query: (id: string) => ({
        document: GET_CATEGORIES_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetCategoriesResponse) =>
        response.categories,
    }),
  }),
})

export const {
  useGetCategoriesByIdQuery,
  useGetCategoriesQuery,
  util: { getRunningOperationPromises },
} = categoriesApi

export const { getCategories, getCategoriesById } = categoriesApi.endpoints
