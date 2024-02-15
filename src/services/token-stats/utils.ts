import { getTokenStats } from '@/services/token-stats'
import { store } from '@/store/store'

const remappingTokenIds = (token: string, cmcToken: string) => {
  if (token !== cmcToken) {
    return { tokenName: token, cmcTokenName: cmcToken }
  }

  switch (token) {
    case 'polygon':
      return { tokenName: 'matic-network', cmcTokenName: 'polygon' }
    case 'bnb':
      return { tokenName: 'binancecoin', cmcTokenName: 'bnb' }
    case 'ordi':
      return { tokenName: 'ordinals', cmcTokenName: 'ordi' }
    default:
      return { tokenName: token }
  }
}

export const getTokenFromURI = (coingeckoUrl: string) =>
  coingeckoUrl
    .split('/')
    .reverse()
    .find((c) => /\w+/.test(c)) as string

const getCmcTokenFromUri = (coinMarketCapUrl: string) => {
  const pattern = /\/currencies\/([^\/]+)/
  const match = coinMarketCapUrl.match(pattern)
  return match ? match[1] : null
}

//TODO: make cmc url test more robust
export const fetchTokenStats = async (
  coingeckoUrl?: string,
  coinMarketCap?: string,
) => {
  if (!coingeckoUrl || !coinMarketCap) return undefined
  const token = getTokenFromURI(coingeckoUrl)
  const cmcToken = getCmcTokenFromUri(coinMarketCap)
  if (!token || !cmcToken) return undefined
  const tokenDetails = remappingTokenIds(token, cmcToken)
  const { data } = await store.dispatch(getTokenStats.initiate(tokenDetails))

  return data
}
