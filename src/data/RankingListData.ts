import { RankinglistHeadProps } from '@/types/RankDataTypes'
import { RiArrowDownSFill } from 'react-icons/ri'

export const CATEGORIES_WITH_INDEX = {
  cryptocurrencies: 0,
  aitokens: 1,
  nfts: 2,
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
    label: 'Marketcap',
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
