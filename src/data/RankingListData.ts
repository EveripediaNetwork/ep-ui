import { RankinglistHeadProps } from '@/types/RankDataTypes'
import { RiArrowUpDownLine } from 'react-icons/ri'

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
    Icon: RiArrowUpDownLine,
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
