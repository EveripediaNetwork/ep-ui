import { BoxProps } from '@chakra-ui/react'
import { BaseEvents } from '@everipedia/iq-utils'
import { IconType } from 'react-icons/lib'
import { z } from 'zod'
import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'
import { Image as ipfsImage } from '@everipedia/iq-utils'

export interface RankCardType {
  hasWiki: any
  id: string
  title: string
  tags: Tag[]
  ipfs: string
  media: Medum[]
  images: Image[]
  nftMarketData: NftMarketData
  tokenMarketData: TokenMarketData
  linkedWikis: {
    founders: string[]
    blockchains: string[]
  }
  founderWikis: founderWikiData[]
  events: BaseEvents[]
}

export type Tag = {
  id: string
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
  isAiToken?: boolean
  market_cap_change_24h: number
}

export interface founderWikiData {
  id: string
  title: string
  images: ipfsImage[]
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
  'Market Cap',
  'Founders',
  'Blockchain',
  'Date Founded',
])

const foundersRankListHeadLabels = z.enum([
  '#',
  'Name',
  'Project',
  'Market Cap',
  '24h Change',
  'Blockchain',
  'Date Founded',
])

export type RankListHeadLabel = z.infer<typeof rankListHeadLabels>

export type foundersRankListHeadLabel = z.infer<
  typeof foundersRankListHeadLabels
>

export type RankinglistHeadProps = {
  label: RankListHeadLabel
  Icon?: IconType
}[]

export type foundersRankinglistHeadProps = {
  label: foundersRankListHeadLabel
  Icon?: IconType
}[]

export type OnClickMap = {
  [key in RankListHeadLabel | foundersRankListHeadLabel]?: () => void
}
export type ObjectKeyType<T> = keyof T
export type CategoryKeyType = ObjectKeyType<typeof CATEGORIES_WITH_INDEX>
