import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_USER_PROFILE } from '@/services/settings/queries'
import config from '@/config'
import { ProfileDataType } from '@/types/SettingsType'
import { GraphQLClient } from 'graphql-request'

export const settingsApiClient = new GraphQLClient(config.graphqlUrl)

type UserProfileData = {
  getProfile: ProfileDataType
}
export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: graphqlRequestBaseQuery({ client: settingsApiClient }),
  endpoints: builder => ({
    getUserProfile: builder.query<ProfileDataType, string>({
      query: (id: string) => ({
        document: GET_USER_PROFILE,
        variables: { id },
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }),
      transformResponse: (response: UserProfileData) => response.getProfile,
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  util: { getRunningOperationPromises },
} = settingsApi

export const { getUserProfile } = settingsApi.endpoints
