import {
  RankinglistHeadProps,
  foundersRankinglistHeadProps,
} from '@/types/RankDataTypes'
import { RiArrowDownSFill } from 'react-icons/ri'
import i18n from '@/utils/i18n'

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
    label: i18n.t('rankingListHeadingName'),
  },
  {
    label: i18n.t('rankingListHeadingPrice'),
  },
  {
    label: i18n.t('rankingListHeadingMarketCap'),
    Icon: RiArrowDownSFill,
  },
  {
    label: i18n.t('rankingListHeadingFounders'),
  },
  {
    label: i18n.t('rankingListHeadingBlockchain'),
  },
  {
    label: i18n.t('rankingListHeadingDateFounded'),
  },
]
export const FoundersRankingListHead: foundersRankinglistHeadProps = [
  {
    label: '#',
  },
  {
    label: i18n.t('rankingListHeadingName'),
  },
  {
    label: i18n.t('rankingListHeadingProject'),
  },
  {
    label: i18n.t('rankingListHeadingMarketCap'),
  },
  {
    label: i18n.t('rankingListHeading24hrChange'),
    Icon: RiArrowDownSFill,
  },
  {
    label: i18n.t('rankingListHeadingBlockchain'),
  },
  {
    label: i18n.t('rankingListHeadingDateFounded'),
  },
]
