import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_LEADER_BOARD
} from '@/services/editor/queries'
import config from '@/config'
import { HYDRATE } from 'next-redux-wrapper'


export type LeaderBoardType = {id: string, Address: string, TotalRewards: string}


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
    getLeaderboard: builder.query<any, void>({
      query: () => ({ document: GET_LEADER_BOARD }),
      transformResponse: (response: any) => response,
    }),
  }),
})

export const {
  useGetLeaderboardQuery, 
  util: { getRunningOperationPromises },
} = editorApi

export const {
  getLeaderboard
} = editorApi.endpoints