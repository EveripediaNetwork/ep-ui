import React from 'react'
import { useSigner } from 'wagmi'
import * as Web3Token from 'web3-token'

export const useWeb3Token = () => {
  const [token, setToken] = React.useState<string>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>()
  const [isReSignToken, reSignToken] = React.useState<boolean>(false)
  const { data: signer } = useSigner()

  React.useEffect(() => {
    if (isReSignToken) setError('')

    reSignToken(false)
    const storedToken = localStorage.getItem('USER_TOKEN')
    if (storedToken) {
      const { address, body } = Web3Token.verify(storedToken)
      if (address && body) {
        setToken(storedToken)
      }
    } else if (signer) {
      const getToken = async () => {
        setLoading(true)
        try {
          const freshToken = await Web3Token.sign(
            msg => signer.signMessage(msg),
            {
              statement:
                'Welcome to Everipedia ! Click to sign in and accept the Everipedia Terms of Service: https://everipedia.com/static/terms. This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours. ',
              expires_in: '1h',
            },
          )
          localStorage.setItem('USER_TOKEN', freshToken)
          setToken(freshToken)
          setLoading(false)
        } catch (e) {
          setError(e as string)
          setLoading(false)
        }
      }
      getToken()
    }
  }, [signer, isReSignToken])

  return { token, loading, reSignToken, error }
}
