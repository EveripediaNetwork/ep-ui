import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slices/user-slice'
import { cookieNames } from '@/types/cookies'
import { verify } from '@everipedia/web3-signer'
import { getCookie } from 'cookies-next'

export const useAddress = () => {
  const dispatch = useDispatch()
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const encodedToken = getCookie(cookieNames.Enum['x-auth-token']) as string

    if (encodedToken) {
      const decodedToken = decodeURI(encodedToken)

      try {
        verify(decodedToken)
        dispatch(setToken(decodedToken))
      } catch (error) {
        console.error('Error verifying token:', error)
      }
    }
  }, [dispatch])

  const simpleAddress = address ? address.toString() : null

  return { address: simpleAddress, isConnected }
}
