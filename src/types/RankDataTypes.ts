import { BoxProps } from '@chakra-ui/react'
import { BaseEvents } from '@everipedia/iq-utils'
import { IconType } from 'react-icons/lib'
import { z } from 'zod'

export interface RankCardType {
  hasWiki: any
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
  hasWiki: boolean
  floor_price_eth: number
  floor_price_usd: number
  market_cap_usd: number
  floor_price_in_usd_24h_percentage_change: number
  alias: string
  image: string
}

export type RankingListButtonProps = {
  label: string
  icon: IconType
} & BoxProps

export type RankpaginationProps = {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount: number
  currentPage: number
  pageSize: number
}

export interface TokenMarketData {
  hasWiki: boolean
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

export interface RankTableProps {
  children: React.ReactNode
  hasPagination?: boolean
  onPageChange?: (currentPage: number) => void
  totalCount?: number
  siblingCount?: number
  currentPage?: number
  pageSize?: number
}

export type SortOrder = 'ascending' | 'descending'

const rankListHeadLabels = z.enum([
  '#',
  'Name',
  'Price',
  'Marketcap',
  'Founders',
  'Blockchain',
  'Date Founded',
])

export type RankListHeadLabel = z.infer<typeof rankListHeadLabels>

export type RankinglistHeadProps = {
  label: RankListHeadLabel
  Icon?: IconType
}[]

export type OnClickMap = { [key in RankListHeadLabel]?: () => void }
