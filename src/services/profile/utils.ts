import { store } from '@/store/store'
import { ProfileSettingsData } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import { getUserProfile } from '.'

export const useUserProfileData = (address?: string) => {
  const [profileData, setProfileData] = useState<ProfileSettingsData>()
  const [account, setAccount] = useState<string>(address || '')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!account) return
    const fetchSettings = async () => {
      try {
        const { data: fetchedProfileData } = await store.dispatch(
          getUserProfile.initiate(account),
        )
        setProfileData(fetchedProfileData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [account])

  return { setAccount, profileData, loading }
}
