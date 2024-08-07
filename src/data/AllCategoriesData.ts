import type { CategoryDataType } from '@/types/CategoryDataTypes'
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
    title: 'categorynftsTitle',
    icon: RiImage2Fill,
    description: 'categorynftsDescription',
    cardImage: '/images/categories/nfts-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'categorydefiTitle',
    icon: RiRecycleLine,
    description: 'categorydefiDescription',
    cardImage: '/images/categories/defi-card.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'categoryexchangesTitle',
    icon: RiCoinsFill,
    description: 'categoryexchangesDescription',
    cardImage: '/images/categories/exchange-new-b.png',
    heroImage: '/images/categories/exchange-new.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'categorycryptocurrenciesTitle',
    icon: RiBitCoinFill,
    description: 'categorycryptocurrenciesDescription',
    cardImage: '/images/categories/cryptocurrencies-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'categorydaosTitle',
    icon: RiTeamFill,
    description: 'categorydaosDescription',
    cardImage: '/images/categories/daos-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'categorypeopleTitle',
    icon: RiUser3Fill,
    description: 'categorypeopleDescription',
    cardImage: '/images/categories/people-card.png',
    heroImage: '/images/categories/people.png',
  },
  {
    id: 'dapps',
    title: 'categorydappsTitle',
    icon: RiCopperDiamondLine,
    description: 'categorydappsDescription',
    cardImage: '/images/categories/dapps-card.png',
    heroImage: '/images/categories/dapps.jpg',
  },
  {
    id: 'organizations',
    title: 'categoryorganizationsTitle',
    icon: RiOrganizationChart,
    description: 'categoryorganizationsDescription',
    cardImage: '/images/categories/organizations-card.png',
    heroImage: '/images/categories/organizations.jpg',
  },
]
