import { getTokenStats } from '@/services/token-stats'
import { store } from '@/store/store'

export const getTokenFromURI = (coingeckoUrl: string) =>
  coingeckoUrl.split('/').at(-1) as string

export const fetchTokenStats = async (coingeckoUrl?: string) => {
  if (!coingeckoUrl) return undefined
  const token = getTokenFromURI(coingeckoUrl)
  if (!token) return undefined
  const { data } = await store.dispatch(getTokenStats.initiate(token))

  return data
}
