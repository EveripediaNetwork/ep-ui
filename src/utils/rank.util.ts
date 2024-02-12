import { RankCardType, SortOrder } from '@/types/RankDataTypes'

export const sortByMarketCap = (order: SortOrder, items: RankCardType[]) => {
  const innerItems = [...items]

  try {
    innerItems.sort((a, b) => {
      const MarketCapA =
        a?.nftMarketData?.market_cap_usd ?? a?.tokenMarketData?.market_cap ?? 0
      const MarketCapB =
        b?.nftMarketData?.market_cap_usd ?? b?.tokenMarketData?.market_cap ?? 0
      if (order === 'ascending') {
        return MarketCapA - MarketCapB
      } else {
        return MarketCapB - MarketCapA
      }
    })
  } catch (e) {
    console.log(e)
  }

  return innerItems
}

//sortBy24hChange
export const sortBy24hChange = (order: SortOrder, items: RankCardType[]) => {
  const innerItems = [...items]

  try {
    innerItems.sort((a, b) => {
      const MarketCapChangeA =
        a?.nftMarketData?.market_cap_usd ??
        a?.tokenMarketData?.market_cap_change_24h ??
        0
      const MarketCapChangeB =
        b?.nftMarketData?.market_cap_usd ??
        b?.tokenMarketData?.market_cap_change_24h ??
        0
      if (order === 'ascending') {
        return MarketCapChangeA - MarketCapChangeB
      } else {
        return MarketCapChangeB - MarketCapChangeA
      }
    })
  } catch (e) {
    console.log(e)
  }

  return innerItems
}
