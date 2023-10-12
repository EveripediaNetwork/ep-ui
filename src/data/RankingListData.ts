import { RankinglistHeadProps } from '@/types/RankDataTypes'
import { RiArrowDownSFill } from 'react-icons/ri'

export const CATEGORIES_WITH_INDEX = {
  cryptocurrencies: 0,
  aitokens: 1,
  stableCoins: 2,
  nfts: 3,
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

export const EXCLUDED_COINS = ['BUSD']
