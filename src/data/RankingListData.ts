import { RankinglistHeadProps } from '@/types/RankDataTypes'
import { RiArrowDownSFill } from 'react-icons/ri'

export const CATEGORIES_WITH_INDEX = {
  cryptocurrencies: 0,
  nfts: 1,
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
