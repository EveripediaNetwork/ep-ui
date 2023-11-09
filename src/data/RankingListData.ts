import {
  RankinglistHeadProps,
  foundersRankinglistHeadProps,
} from '@/types/RankDataTypes'
import { RiArrowDownSFill } from 'react-icons/ri'

export const CATEGORIES_WITH_INDEX = {
  cryptocurrencies: 0,
  stableCoins: 1,
  aitokens: 2,
  founders: 3,
  nfts: 4,
}

export const RankingListHead: RankinglistHeadProps = [
  {
    label: '#',
  },
  {
    label: 'Name',
  },
  {
    label: 'Price',
  },
  {
    label: 'Market Cap',
    Icon: RiArrowDownSFill,
  },
  {
    label: 'Founders',
  },
  {
    label: 'Blockchain',
  },
  {
    label: 'Date Founded',
  },
]
export const FoundersRankingListHead: foundersRankinglistHeadProps = [
  {
    label: '#',
  },
  {
    label: 'Name',
  },
  {
    label: 'Project',
  },
  {
    label: 'Market Cap',
    Icon: RiArrowDownSFill,
  },
  {
    label: 'Blockchain',
  },
  {
    label: 'Date Founded',
  },
]
