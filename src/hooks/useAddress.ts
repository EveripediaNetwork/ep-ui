import { setToken } from '@/store/slices/user-slice'
import { cookieNames } from '@/types/cookies'
import { verify } from '@everipedia/web3-signer'
import { deleteCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useAddress = () => {
  const dispatch = useDispatch()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const isWalletConnected = !!localStorage.getItem('wagmi.wallet')
    const isConnectorConnected = !!localStorage.getItem('wagmi.connected')
    const isInjectorConnected = !!localStorage.getItem(
      'wagmi.injected.connected',
    )

    if (isInjectorConnected) {
      setIsConnected(isInjectorConnected)
      return
    }

    setIsConnected(isWalletConnected && isConnectorConnected)
  }, [])

  const encodedToken = getCookie(cookieNames.Enum['x-auth-token']) as string

  if (!encodedToken) {
    return { address: null, isConnected }
  }

  const decodedToken = decodeURI(encodedToken)

  try {
    const { address, body } = verify(decodedToken)
    const expirationTime = new Date(body['expiration-time']).getTime()

    if (expirationTime < Date.now()) {
      deleteCookie(cookieNames.Enum['x-auth-token'])

      window.location.reload()
      return { address: null, isConnected }
    }

    dispatch(setToken(decodedToken))

    return { address, isConnected }
  } catch (error) {
    console.error('Error verifying token:', error)

    return { address: null, isConnected }
  }
}
