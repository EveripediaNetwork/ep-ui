import { store } from '@/store/store'
import { ProfileSettingsData } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import { getUserProfile, getUserSettings } from '.'

interface UserProfileOptions {
  withAllSettings: boolean
}
export const useUserProfileData = (
  address?: string,
  options?: UserProfileOptions,
) => {
  const [profileData, setProfileData] = useState<ProfileSettingsData>()
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
  }, [account, options?.withAllSettings])

  return { setAccount, profileData, loading }
}
