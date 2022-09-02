import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addENSAddress } from '@/store/slices/ens-slice'
import axios from 'axios'
import config from '@/config'

export const useENSData = (address?: string | null, skip = false) => {
  const [avatar, setAvatar] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const ens = useAppSelector(state => state.ens)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (skip) return
    const getAvatar = async (addrs: string) => {
      try {
        const ensResponse = await axios.get(
          `${config.publicDomain}/api/ens/${addrs.toLowerCase()}`,
        )
        const { name } = ensResponse.data
        const avatarURI = ensResponse.data.avatar
        if (name) {
          setUsername(name)
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
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
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
