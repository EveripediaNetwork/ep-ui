import { useAccount, useWalletClient } from 'wagmi'
import { sign, verify } from '@everipedia/web3-signer'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { cookieNames } from '@/types/cookies'
import { setToken } from '@/store/slices/user-slice'

export const useWeb3Token = () => {
  const { data: walletClient } = useWalletClient()
  const { isConnected, address: userAddress } = useAccount()
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.user.token)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateNewToken = async () => {
    if (!isConnected) {
      setError('Wallet not connected')
      throw new Error('Wallet not connected')
    }
    if (!walletClient) {
      setError('Wallet client not available')
      return null
    }
    try {
      setLoading(true)
      setError('')
      const freshToken = await sign(
        (msg) => walletClient.signMessage({ message: msg }),
        {
          statement:
            'Welcome to IQ.GPT ! Click to sign in and accept the IQ.GPT Terms of Service. This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 365 days.',
          expires_in: '365d',
        },
      )
      setCookie(cookieNames.Enum['x-auth-token'], freshToken, {
        maxAge: 60 * 60 * 24 * 365,
      })
      dispatch(setToken(freshToken))
      return freshToken
    } catch (error: any) {
      setError(error.message || 'Failed to generate new token')
    } finally {
      setLoading(false)
    }
    return null
  }

  const fetchStoredToken = async () => {
    const storedToken = getCookie(cookieNames.Enum['x-auth-token']) as string

    if (!storedToken) {
      setError('No token found')
      return null
    }

    const { address, body } = verify(storedToken)
    if (address.toLowerCase() !== userAddress?.toLowerCase()) {
      deleteCookie(cookieNames.Enum['x-auth-token'])
      setError('Token address mismatch')
      return null
    }
    if (address && body) {
      dispatch(setToken(storedToken))
      return storedToken
    } else {
      deleteCookie(cookieNames.Enum['x-auth-token'])
      setError('Invalid token data')
    }
  }

  return {
    token,
    loading,
    error,
    generateNewToken,
    fetchStoredToken,
  }
}
