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

export const AllCategoriesData: CategoryDataType[] = [
  {
    id: 'nfts',
    title: 'NFTs',
    icon: RiImage2Fill,
    description: 'categoryNftDescription',
    cardImage: '/images/categories/nfts-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'Decentralized Finance',
    icon: RiRecycleLine,
    description: 'categoryDefiDescription',
    cardImage: '/images/categories/defi-card.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'Exchanges',
    icon: RiCoinsFill,
    description: 'categoryExcDescription',
    cardImage: '/images/categories/exchange-new-b.png',
    heroImage: '/images/categories/exchange-new.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'Cryptocurrencies',
    icon: RiBitCoinFill,
    description: 'categoryCryptoDescription',
    cardImage: '/images/categories/cryptocurrencies-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'DAOs',
    icon: RiTeamFill,
    description: 'categoryDaoDescription',
    cardImage: '/images/categories/daos-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'People in Crypto',
    icon: RiUser3Fill,
    description: 'categoryPeopleInCryptoDescription',
    cardImage: '/images/categories/people-card.png',
    heroImage: '/images/categories/people.png',
  },
  {
    id: 'dapps',
    title: 'Decentralized Applications',
    icon: RiCopperDiamondLine,
    description: 'categoryDAdescription',
    cardImage: '/images/categories/dapps-card.png',
    heroImage: '/images/categories/dapps.jpg',
  },
  {
    id: 'organizations',
    title: 'Organizations',
    icon: RiOrganizationChart,
    description:
      'The Organizatons category covers companies and other organizations that develop, implement, or utilize blockchain technology.',
    cardImage: '/images/categories/organizations-card.png',
    heroImage: '/images/categories/organizations.jpg',
  },
]
