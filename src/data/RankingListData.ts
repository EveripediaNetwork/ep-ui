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
    id: '#',
    label: '#',
  },
  {
    id: 'Name',
    label: 'rankingListHeadingName',
  },
  {
    id: 'Price',
    label: 'rankingListHeadingPrice',
  },
  {
    id: 'Market Cap',
    Icon: RiArrowDownSFill,
    label: 'rankingListHeadingMarketCap',
  },
  {
    id: 'Founders',
    label: 'rankingListHeadingFounders',
  },
  {
    id: 'Blockchain',
    label: 'rankingListHeadingBlockchain',
  },
  {
    id: 'Date Founded',
    label: 'rankingListHeadingDateFounded',
  },
]

export const FoundersRankingListHead: foundersRankinglistHeadProps = [
  {
    label: '#',
    id: '#',
  },
  {
    id: 'Name',
    label: 'rankingListHeadingName',
  },
  {
    label: 'rankingListHeadingProject',
    id: 'Project',
  },
  {
    label: 'rankingListHeadingMarketCap',
    id: 'Market Cap',
  },
  {
    label: 'rankingListHeading24hrChange',
    id: '24h Change',
    Icon: RiArrowDownSFill,
  },
  {
    id: 'Blockchain',
    label: 'rankingListHeadingBlockchain',
  },
  {
    id: 'Date Founded',
    label: 'rankingListHeadingDateFounded',
  },
]
