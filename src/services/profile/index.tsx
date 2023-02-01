import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USERNAME_TAKEN,
  GET_USER_ADDRESS_FROM_USERNAME,
  GET_USER_AVATAR,
  GET_USER_EMAIL_AND_SUBSCRIPTIONS,
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

export type UserEmailAndSubscriptions = {
  email: string
  subscriptions: string[]
}

type UserEmailAndSubscriptionsResponse = {
  getProfile: UserEmailAndSubscriptions
}

type IsUsernameTakenData = {
  usernameTaken: boolean
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
    getUserEmailAndSubscriptions: builder.query<
      UserEmailAndSubscriptions,
      string
    >({
      query: (id: string) => ({
        document: GET_USER_EMAIL_AND_SUBSCRIPTIONS,
        variables: { id },
      }),
      transformResponse: (response: UserEmailAndSubscriptionsResponse) =>
        response.getProfile,
    }),
    getUsernameTaken: builder.query<boolean, string>({
      query: (username: string) => ({
        document: GET_USERNAME_TAKEN,
        variables: { username },
      }),
      transformResponse: (response: IsUsernameTakenData) =>
        response.usernameTaken,
    }),
    getUserAvatar: builder.query<string, string>({
      query: (id: string) => ({
        document: GET_USER_AVATAR,
        variables: { id },
      }),
      transformResponse: (response: UserProfileData) =>
        response.getProfile?.avatar || '',
    }),
    getUserAddressFromUsername: builder.query<string, string>({
      query: (username: string) => ({
        document: GET_USER_ADDRESS_FROM_USERNAME,
        variables: { username },
      }),
      transformResponse: (response: UserProfileData) => response.getProfile.id,
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
    }),
  }),
})

export const {
  useGetUserSettingsQuery,
  useGetUserProfileQuery,
  useGetUsernameTakenQuery,
  usePostUserProfileMutation,
  useGetUserAvatarQuery,
  useGetUserAddressFromUsernameQuery,
  useGetUserEmailAndSubscriptionsQuery,
} = profileApi

export const {
  getUserSettings,
  getUserProfile,
  getUsernameTaken,
  getUserAvatar,
  getUserAddressFromUsername,
  getUserEmailAndSubscriptions,
  postUserProfile,
} = profileApi.endpoints
