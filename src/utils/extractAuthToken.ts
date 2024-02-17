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

  try {
    const { address, body } = verify(decodedToken)

    const expirationTime = new Date(body['expiration-time']).getTime()
    const currentTime = Date.now()

    if (currentTime > expirationTime) {
      return { address: null }
    }

    return { address }
  } catch (error) {
    console.error('Error verifying token:', error)
    return { address: null }
  }
}
