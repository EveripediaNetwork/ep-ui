import React, { useCallback } from 'react'
import { useSigner } from 'wagmi'
import { sign, verify } from 'web3-token'

export const useWeb3Token = () => {
  const [token, setToken] = React.useState<string>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>()
  const [isReSignToken, reSignToken] = React.useState<boolean>(false)
  const { data: signer } = useSigner()

  const generateNewTokenAndStore = useCallback(async () => {
    if (!signer) return
    const freshToken = await sign(msg => signer.signMessage(msg), {
      statement:
        'Welcome to Everipedia ! Click to sign in and accept the Everipedia Terms of Service: https://everipedia.com/static/terms. This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours. ',
      expires_in: '1h',
    })
    localStorage.setItem('USER_TOKEN', freshToken)
    setToken(freshToken)
  }, [signer])

  const fetchStoredToken = useCallback(() => {
    const storedToken = localStorage.getItem('USER_TOKEN')
    if (storedToken) {
      const { address, body } = verify(storedToken)
      if (address && body) {
        setToken(storedToken)
      }
    } else {
      throw new Error('No token found')
    }
  }, [])

  React.useEffect(() => {
    const retrieveWeb3Token = async () => {
      if (isReSignToken) setError('')
      else reSignToken(false)

      const generateNewToken = async () => {
        setLoading(true)
        try {
          await generateNewTokenAndStore()
        } catch (e) {
          setError(e as string)
        }
        setLoading(false)
      }

      try {
        fetchStoredToken()
      } catch {
        await generateNewToken()
      }
    }
    retrieveWeb3Token()
  }, [signer, isReSignToken, generateNewTokenAndStore, fetchStoredToken])

  return { token, loading, reSignToken, error }
}
