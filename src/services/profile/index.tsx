import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GET_USER_PROFILE, POST_USER_PROFILE } from '@/services/profile/queries'
import config from '@/config'
import { ProfileDataType } from '@/types/ProfileType'
import { GraphQLClient } from 'graphql-request'

export const profileApiClient = new GraphQLClient(config.graphqlUrl)

type UserProfileData = {
  getProfile: ProfileDataType
}

type SetProfileResponse = {
  createProfile: {
    UserProfile: ProfileDataType
  }
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: graphqlRequestBaseQuery({ client: profileApiClient }),
  endpoints: builder => ({
    getUserProfile: builder.query<ProfileDataType, string>({
      query: (id: string) => ({
        document: GET_USER_PROFILE,
        variables: { id },
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
} = profileApi

export const { getUserProfile, postUserProfile } = profileApi.endpoints
