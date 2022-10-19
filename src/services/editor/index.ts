import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_LEADER_BOARD } from '@/services/editor/queries'
import config from '@/config'
import { HYDRATE } from 'next-redux-wrapper'

export type LeaderBoardType = {
  id: string
  totalRewards: number
}

type LeaderboardResponseType = {
  editors: LeaderBoardType[]
}

export const editorApi = createApi({
  reducerPath: 'editorApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.editorGraphqlUrl }),
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  endpoints: builder => ({
    getLeaderboard: builder.query<LeaderBoardType[], void>({
      query: () => ({ document: GET_LEADER_BOARD }),
      transformResponse: (response: LeaderboardResponseType) => response.editors,
    }),
  }),
})

export const {
  useGetLeaderboardQuery,
  util: { getRunningOperationPromises },
} = editorApi

export const { getLeaderboard } = editorApi.endpoints
