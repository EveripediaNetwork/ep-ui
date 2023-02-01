import { store } from '@/store/store'
import { ProfileSettingsData } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import {
  getUserAvatar,
  getUserEmailAndSubscriptions,
  getUsernameTaken,
  getUserProfile,
  getUserSettings,
  UserEmailAndSubscriptions,
} from '.'

export enum UserProfileFetchOptions {
  WITH_ALL_SETTINGS,
  ONLY_EMAIL_AND_SUBSCRIPTIONS,
  ONLY_AVATAR,
}

type ProfileDataType<T extends UserProfileFetchOptions> =
  T extends UserProfileFetchOptions.WITH_ALL_SETTINGS
    ? ProfileSettingsData | undefined
    : T extends UserProfileFetchOptions.ONLY_AVATAR
    ? string | undefined
    : T extends UserProfileFetchOptions.ONLY_EMAIL_AND_SUBSCRIPTIONS
    ? UserEmailAndSubscriptions | undefined
    : ProfileSettingsData

export const useUserProfileData = <T extends UserProfileFetchOptions>(
  address?: string,
  options?: T,
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
        } else if (
          options === UserProfileFetchOptions.ONLY_EMAIL_AND_SUBSCRIPTIONS
        ) {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserEmailAndSubscriptions.initiate(account),
          )
          setProfileData(fetchedProfileData as ProfileDataType<T>)
        } else {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserProfile.initiate(account),
          )
          setProfileData(fetchedProfileData as ProfileDataType<T>)
        }
        setLoading(false)
      } catch (err) {
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
