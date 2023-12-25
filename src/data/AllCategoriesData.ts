import { CategoryDataType } from '@/types/CategoryDataTypes'
import {
  RiBitCoinFill,
  RiCoinsFill,
  RiImage2Fill,
  RiRecycleLine,
  RiTeamFill,
  RiUser3Fill,
  RiCopperDiamondLine,
  RiOrganizationChart,
} from 'react-icons/ri'
import i18n from '@/utils/i18n'

export const AllCategoriesData: CategoryDataType[] = [
  {
    id: 'nfts',
    title: 'NFTs',
    icon: RiImage2Fill,
    description: i18n.t('NftCategoryDesciption'),
    cardImage: '/images/categories/nfts-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'Decentralized Finance',
    icon: RiRecycleLine,
    description: i18n.t('DeFiCategoryDesciption'),
    cardImage: '/images/categories/defi-card.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'Exchanges',
    icon: RiCoinsFill,
    description: i18n.t('ExchangesCategoryDesciption'),
    cardImage: '/images/categories/exchange-new-b.png',
    heroImage: '/images/categories/exchange-new.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'Cryptocurrencies',
    icon: RiBitCoinFill,
    description: i18n.t('CryptoCategoryDesciption'),
    cardImage: '/images/categories/cryptocurrencies-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'DAOs',
    icon: RiTeamFill,
    description: i18n.t('daoCategoryDesciption'),
    cardImage: '/images/categories/daos-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'People in Crypto',
    icon: RiUser3Fill,
    description: i18n.t('peopleCategoryDesciption'),
    cardImage: '/images/categories/people-card.png',
    heroImage: '/images/categories/people.png',
  },
  {
    id: 'dapps',
    title: 'Decentralized Applications',
    icon: RiCopperDiamondLine,
    description: i18n.t('dappsCategoryDesciption'),
    cardImage: '/images/categories/dapps-card.png',
    heroImage: '/images/categories/dapps.jpg',
  },
  {
    id: 'organizations',
    title: 'Organizations',
    icon: RiOrganizationChart,
    description: i18n.t('organizationsCategoryDesciption'),
    cardImage: '/images/categories/organizations-card.png',
    heroImage: '/images/categories/organizations.jpg',
  },
]
