import { BaseEvents } from '@everipedia/iq-utils'

export interface RankCardType {
  id: string
  title: string
  ipfs: string
  media: Medum[]
  images: Image[]
  nftMarketData: NftMarketData
  tokenMarketData: TokenMarketData
  linkedWikis: {
    founders: string[]
    blockchains: string[]
  }
  events: BaseEvents[]
}

export interface Medum {
  thumbnail: string
}

export interface Image {
  id: string
}

export interface NftMarketData {
  floor_price_eth: number
  floor_price_usd: number
  market_cap_usd: number
  floor_price_in_usd_24h_percentage_change: number
  alias: string
  image: string
}
export interface TokenMarketData {
  floor_price_eth: number
  floor_price_usd: number
  market_cap: number
  market_cap_usd: number
  floor_price_in_usd_24h_percentage_change: number
  price_change_24h: number
  alias: string
  current_price: number
  image: string
}
