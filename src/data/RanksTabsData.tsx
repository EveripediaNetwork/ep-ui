import {
  RiCoinsFill,
  RiCoinFill,
  RiRobotFill,
  RiUserFill,
} from 'react-icons/ri'
import { BiImage } from 'react-icons/bi'

export const tabsData = [
  {
    id: 'cryptocurrencies',
    value: 'rankingListButtonCryptocurrencies',
    icon: RiCoinsFill,
    label: 'rankingListButtonCryptocurrencies',
  },
  {
    id: 'stableCoins',
    value: 'rankingListButtonStablecoins',
    icon: RiCoinFill,
    label: 'rankingListButtonStablecoins',
  },
  {
    id: 'aitokens',
    value: 'rankingListButtonAITokens',
    icon: RiRobotFill,
    label: 'rankingListButtonAITokens',
  },
  {
    id: 'founders',
    value: 'rankingListButtonFounders',
    icon: RiUserFill,
    label: 'rankingListButtonFounders',
  },
  {
    id: 'nfts',
    value: 'rankingListButtonNfts',
    icon: BiImage,
    label: 'rankingListButtonNfts',
  },
]
