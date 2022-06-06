import { useEffect, useState } from 'react'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { AvatarResolver } from '@ensdomains/ens-avatar'
import config from '@/config'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addENSAddress } from '@/store/slices/ens-slice'

export const useENSData = (address: string | undefined | null) => {
  const [avatar, setAvatar] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const ens = useAppSelector(state => state.ens)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getAvatar = async (addrs: string) => {
      const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)
      const name = await provider.lookupAddress(addrs)
      let avatarURI
      if (name) {
        setUsername(name)
        const avt = new AvatarResolver(provider, { cache: 300 })
        avatarURI = await avt.getAvatar(name, {
          /* jsdomWindow: jsdom (on nodejs) */
        })
        if (avatarURI) setAvatar(avatarURI)
      }
      setLoading(false)
      dispatch(
        addENSAddress({
          address: addrs,
          username: name || null,
          avatar: avatarURI || null,
        }),
      )
    }

    if (!avatar && address) {
      // first look up the ENS in the redux ens slice
      if (ens[address]) {
        setAvatar(ens[address].avatar)
        setUsername(ens[address].username)
      }
      // if it's not there, look it up in the blockchain
      // and save data to the redux slice
      else {
        getAvatar(address)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, avatar, ens])

  return [avatar, username, loading] as const
}
