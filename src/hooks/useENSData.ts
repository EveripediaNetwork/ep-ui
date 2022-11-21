import { getEns } from '@/services/ens'
import { store } from '@/store/store'
import React from 'react'

export const useENSData = (address?: string | null, skip?: boolean) => {
  const [avatar, setAvatar] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!address || skip) return
    const fetchEnsData = async () => {
      setLoading(true)
      const { data } = await store.dispatch(
        getEns.initiate(address.toLowerCase()),
      )
      if (data) {
        setAvatar(data.avatar)
        setDisplayName(p =>
          data.displayName.endsWith('.eth') ? data.displayName : p,
        )
      }
      setLoading(false)
    }
    fetchEnsData()
  }, [address, skip])

  return [avatar, displayName, loading] as const
}
