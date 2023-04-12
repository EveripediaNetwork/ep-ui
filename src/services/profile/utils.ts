import { store } from '@/store/store'
import { ProfileSettingsData } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import {
  getUserAvatar,
  getUserEmail,
  getUsernameTaken,
  getUserProfile,
  getUserSettings,
  UserEmail,
} from '.'

export enum UserProfileFetchOptions {
  WITH_ALL_SETTINGS = 0,
  ONLY_EMAIL = 1,
  ONLY_AVATAR = 2,
  USER_PROFILE = 3,
}

type ProfileDataType<T extends UserProfileFetchOptions> =
  T extends UserProfileFetchOptions.WITH_ALL_SETTINGS
    ? ProfileSettingsData | undefined
    : T extends UserProfileFetchOptions.ONLY_AVATAR
    ? string | undefined
    : T extends UserProfileFetchOptions.ONLY_EMAIL
    ? UserEmail | undefined
    : ProfileSettingsData

export const useUserProfileData = <T extends UserProfileFetchOptions>(
  options: T,
  address?: string,
) => {
  const [profileData, setProfileData] = useState<ProfileDataType<T>>()
  const [avatar, setAvatar] = useState<string>()
  const [account, setAccount] = useState<string>(address || '')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!account) return
    const fetchSettings = async () => {
      try {
        if (options === UserProfileFetchOptions.WITH_ALL_SETTINGS) {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserSettings.initiate(account),
          )
          setProfileData(fetchedProfileData as ProfileDataType<T>)
        } else if (options === UserProfileFetchOptions.ONLY_AVATAR) {
          const { data: fetchedUserProfileAvatar } = await store.dispatch(
            getUserAvatar.initiate(account),
          )
          setAvatar(fetchedUserProfileAvatar)
        } else if (options === UserProfileFetchOptions.ONLY_EMAIL) {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserEmail.initiate(account),
          )
          setProfileData(fetchedProfileData as ProfileDataType<T>)
        } else if (options === UserProfileFetchOptions.USER_PROFILE) {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserProfile.initiate(account),
          )
          setProfileData(fetchedProfileData as ProfileDataType<T>)
        }
        setLoading(false)
      } catch (_err) {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [account, options])

  return { setAccount, profileData, loading, avatar }
}

export const isUserNameTaken = async (username: string) => {
  const { data } = await store.dispatch(getUsernameTaken.initiate(username))
  return data
}
