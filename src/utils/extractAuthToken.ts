import { verify } from '@everipedia/web3-signer'
import { IncomingMessage } from 'http'

type RequestWithCookies = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string
  }>
}

export const extractAuthToken = (req: RequestWithCookies) => {
  const authToken = req.cookies['x-auth-token']

  if (!authToken) {
    return { address: null }
  }

  const decodedToken = decodeURI(authToken)

  const { address } = verify(decodedToken)

  return { address }
}
