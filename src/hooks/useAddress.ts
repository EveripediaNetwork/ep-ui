import { cookieNames } from '@/types/cookies'
import { verify } from '@everipedia/web3-signer'
import { getCookie } from 'cookies-next'

export const useAddress = () => {
  const encodedToken = getCookie(cookieNames.Enum['x-auth-token']) as string

  if (!encodedToken) {
    return { address: null }
  }
  const decodedToken = decodeURI(encodedToken)

  const { address } = verify(decodedToken)

  return { address }
}
