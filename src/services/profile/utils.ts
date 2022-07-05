import { store } from '@/store/store'
import { ProfileDataType } from '@/types/ProfileType'
import { useEffect, useState } from 'react'
import { getUserProfile } from '.'

export const useSettingsData = () => {
  const [settingsData, setSettingsData] = useState<ProfileDataType>()
  const [account, setAccount] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!account) return
    const fetchSettings = async () => {
      try {
        const { data: fetchedSettingsData } = await store.dispatch(
          getUserProfile.initiate(account),
        )
        setSettingsData(fetchedSettingsData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [account])

  return { setAccount, settingsData, loading }
}
