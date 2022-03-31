import { useEffect, useState } from 'react'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { AvatarResolver } from '@ensdomains/ens-avatar'
import config from '@/config'

// TODO: future improvements: cache results
export const useENSData = (address: string | undefined | null) => {
  const [avatar, setAvatar] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getAvatar = async (addrs: string) => {
      const provider = new StaticJsonRpcProvider(config.ensRPC)
      const name = await provider.lookupAddress(addrs)
      setUsername(name)
      if (name) {
        const avt = new AvatarResolver(provider, { cache: 300 })
        const avatarURI = await avt.getAvatar(name)
        setAvatar(avatarURI)
      }
      setLoading(false)
    }

    if (!avatar && address) {
      getAvatar(address)
    }
  }, [address])

  return [avatar, username, loading] as const
}
