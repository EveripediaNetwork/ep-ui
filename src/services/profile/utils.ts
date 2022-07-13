import { store } from '@/store/store'
import { ProfileSettingsData } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import {
  getUserAvatar,
  getUsernameTaken,
  getUserProfile,
  getUserSettings,
} from '.'

interface UserProfileOptions {
  withAllSettings?: boolean
  onlyAvatar?: boolean
}
export const useUserProfileData = (
  address?: string,
  options?: UserProfileOptions,
) => {
  const [profileData, setProfileData] = useState<ProfileSettingsData>()
  const [avatar, setAvatar] = useState<string>()
  const [account, setAccount] = useState<string>(address || '')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!account) return
    const fetchSettings = async () => {
      try {
        if (options?.withAllSettings) {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserSettings.initiate(account),
          )
          setProfileData(fetchedProfileData)
        } else if (options?.onlyAvatar) {
          const { data: fetchedUserProfileAvatar } = await store.dispatch(
            getUserAvatar.initiate(account),
          )
          setAvatar(fetchedUserProfileAvatar)
        } else {
          const { data: fetchedProfileData } = await store.dispatch(
            getUserProfile.initiate(account),
          )
          setProfileData(fetchedProfileData)
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [account, options?.onlyAvatar, options?.withAllSettings])

  return { setAccount, profileData, loading, avatar }
}

export const isUserNameTaken = async (username: string) => {
  const { data } = await store.dispatch(getUsernameTaken.initiate(username))
  return data
}
