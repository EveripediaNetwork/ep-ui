import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USER_PROFILE,
  GET_USER_SETTINGS,
  POST_USER_SETTINGS,
} from '@/services/profile/queries'
import config from '@/config'
import { ProfileSettingsData } from '@/types/ProfileType'
import { GraphQLClient } from 'graphql-request'

export const profileApiClient = new GraphQLClient(config.graphqlUrl)

type UserProfileData = {
  getProfile: ProfileSettingsData
}

type SetProfileResponse = {
  createProfile: {
    UserProfile: ProfileSettingsData
  }
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: graphqlRequestBaseQuery({ client: profileApiClient }),
  endpoints: builder => ({
    getUserSettings: builder.query<ProfileSettingsData, string>({
      query: (id: string) => ({
        document: GET_USER_SETTINGS,
        variables: { id },
      }),
      transformResponse: (response: UserProfileData) => response.getProfile,
    }),
    getUserProfile: builder.query<ProfileSettingsData, string>({
      query: (id: string) => ({
        document: GET_USER_PROFILE,
        variables: { id },
      }),
      transformResponse: (response: UserProfileData) => response.getProfile,
    }),
    postUserProfile: builder.mutation<
      ProfileSettingsData,
      { profileInfo: Partial<ProfileSettingsData> }
    >({
      query: ({ profileInfo }) => ({
        document: POST_USER_SETTINGS,
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
  useGetUserSettingsQuery,
  useGetUserProfileQuery,
  usePostUserProfileMutation,
  util: { getRunningOperationPromises },
} = profileApi

export const { getUserSettings, getUserProfile, postUserProfile } =
  profileApi.endpoints
