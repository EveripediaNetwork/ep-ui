import React from 'react'
import { useSigner } from 'wagmi'
import * as Web3Token from 'web3-token'

export const useWeb3Token = () => {
  const [token, setToken] = React.useState<string>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { data: signer } = useSigner()

  React.useEffect(() => {
    const storedToken = localStorage.getItem('USER_TOKEN')
    if (storedToken) {
      const { address, body } = Web3Token.verify(storedToken)
      if (address && body) {
        setToken(storedToken)
      }
    } else if (signer) {
      const getToken = async () => {
        setLoading(true)
        const freshToken = await Web3Token.sign(
          msg => signer.signMessage(msg),
          '1d',
        )
        localStorage.setItem('USER_TOKEN', freshToken)
        setToken(freshToken)
        setLoading(false)
      }
      getToken()
    }
  }, [signer])

  return { token, loading }
}
