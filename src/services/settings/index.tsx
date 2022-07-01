import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USER_PROFILE,
  POST_USER_PROFILE,
} from '@/services/settings/queries'
import config from '@/config'
import { ProfileDataType } from '@/types/SettingsType'
import { GraphQLClient } from 'graphql-request'

export const settingsApiClient = new GraphQLClient(config.graphqlUrl)

type UserProfileData = {
  getProfile: ProfileDataType
}

type SetProfileResponse = {
  createProfile: {
    UserProfile: ProfileDataType
  }
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
    postUserProfile: builder.mutation<
      ProfileDataType,
      { profileInfo: Partial<ProfileDataType> }
    >({
      query: ({ profileInfo }) => ({
        document: POST_USER_PROFILE,
        variables: {
          profileInfo: JSON.stringify(profileInfo),
        },
      }),
      transformResponse: (response: SetProfileResponse) =>
        response.createProfile.UserProfile,
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  usePostUserProfileMutation,
  util: { getRunningOperationPromises },
} = settingsApi

export const { getUserProfile, postUserProfile } = settingsApi.endpoints
