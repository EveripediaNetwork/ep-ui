import { store } from '@/store/store'
import { getNFTStats } from '@/services/nft-stats'
import { getTokenFromURI } from '../token-stats/utils'

export const fetchNFTStats = async (coingeckoUrl?: string) => {
  if (!coingeckoUrl) return undefined
  const nftID = getTokenFromURI(coingeckoUrl) as string
  if (!nftID) return undefined

  const { data } = await store.dispatch(getNFTStats.initiate(nftID))

  return data
}
