import { getTokenStats } from '@/services/token-stats'
import { store } from '@/store/store'

export const getTokenFromURI = (coingeckoUrl: string) =>
  coingeckoUrl
    .split('/')
    .reverse()
    .find(c => /\w+/.test(c))

export const fetchTokenStats = async (coingeckoUrl?: string) => {
  if (!coingeckoUrl) return undefined
  const token = getTokenFromURI(coingeckoUrl)
  if (!token) return undefined
  const { data } = await store.dispatch(getTokenStats.initiate(token))

  return data
}
