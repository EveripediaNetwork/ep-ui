import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_ID,
  GET_CATEGORIES_LINKS,
} from '@/services/categories/queries'
import { Category, CategoryLink } from '@/types/CategoryDataTypes'
import config from '@/config'

type GetCategoriesResponse = {
  categories: Category[]
}
type GetCategoriesLinksResponse = {
  categories: CategoryLink[]
}

type GetCategoryByIdResponse = {
  categoryById: Category[]
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
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ document: GET_CATEGORIES }),
      transformResponse: (response: GetCategoriesResponse) =>
        response.categories,
    }),
    getCategoriesById: builder.query<Category[], string>({
      query: (id: string) => ({
        document: GET_CATEGORIES_BY_ID,
        variables: { id },
      }),
      transformResponse: (response: GetCategoryByIdResponse) =>
        response.categoryById,
    }),
    getCategoriesLinks: builder.query<CategoryLink[], void>({
      query: () => ({
        document: GET_CATEGORIES_LINKS,
      }),
      transformResponse: (response: GetCategoriesLinksResponse) =>
        response.categories,
    }),
  }),
})

export const {
  useGetCategoriesByIdQuery,
  useGetCategoriesQuery,
  useGetCategoriesLinksQuery,
} = categoriesApi

export const { getCategories, getCategoriesById, getCategoriesLinks } =
  categoriesApi.endpoints
