import { getTokenStats } from '@/services/token-stats'
import { store } from '@/store/store'

const remappingTokenIds = (token: string) => {
  switch (token) {
    case 'polygon':
      return { tokenName: 'matic-network', cmcTokenName: 'polygon' }
    case 'bnb':
      return { tokenName: 'binancecoin', cmcTokenName: 'bnb' }
    default:
      return { tokenName: token }
  }
}

export const getTokenFromURI = (coingeckoUrl: string) =>
  coingeckoUrl
    .split('/')
    .reverse()
    .find(c => /\w+/.test(c)) as string

export const fetchTokenStats = async (coingeckoUrl?: string) => {
  if (!coingeckoUrl) return undefined
  const token = getTokenFromURI(coingeckoUrl)
  if (!token) return undefined
  const tokenDetails = remappingTokenIds(token)
  const { data } = await store.dispatch(getTokenStats.initiate(tokenDetails))

  return data
}
