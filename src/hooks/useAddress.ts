import { setToken } from '@/store/slices/user-slice'
import { cookieNames } from '@/types/cookies'
import { verify } from '@everipedia/web3-signer'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useAddress = () => {
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const wagmiConnected = localStorage.getItem('wagmi.connected')
    setIsConnected(wagmiConnected === 'true')
  }, [])

  const encodedToken = getCookie(cookieNames.Enum['x-auth-token']) as string

  if (!encodedToken) {
    return { address: null, isConnected }
  }

  const decodedToken = decodeURI(encodedToken)

  try {
    const { address } = verify(decodedToken)

    dispatch(setToken(decodedToken))

    return { address, isConnected }
  } catch (error) {
    console.error('Error verifying token:', error)

    return { address: null, isConnected }
  }
}
