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
    description:
      'The NFTs (non-fungible tokens) category covers all things NFT from collections like the Bored Ape Yacht Club to games like Axie Infinity to artists like Beeple.',
    cardImage: '/images/categories/nft-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'Decentralized Finance',
    icon: RiRecycleLine,
    description:
      'The Decentralized Finance (DeFi) category covers everything from stablecoin projects like Frax Finance to concepts like Yield Farming to the oracles which power DeFi like Chainlink.',
    cardImage: '/images/categories/defi-card-bg.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'Exchanges',
    icon: RiCoinsFill,
    description:
      'The Exchanges category covers all crypto exchanges including both centralized exchanges like Binance or Coinbase and decentralized exchanges like Uniswap or Quickswap.',
    cardImage: '/images/categories/exchange-card.png',
    heroImage: '/images/categories/exchanges.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'Cryptocurrencies',
    icon: RiBitCoinFill,
    description:
      'This cryptocurrencies category covers all cryptocurrencies from Bitcoin to IQ. ',
    cardImage: '/images/categories/cryptocurrency-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'DAOs',
    icon: RiTeamFill,
    description:
      'The DAOs category covers decentralized autonomous organizations of all kinds from DeFi DAOs like Olympus DAO to knowledge focused DAOs like BrainDAO.',
    cardImage: '/images/categories/dao-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'People in crypto',
    icon: RiUser3Fill,
    description:
      'The People in Crypto category covers everyone working to grow the crypto space from developers to artists to marketers to policy makers and everyone in between.',
    cardImage: '/images/categories/people-crypto-card.png',
    heroImage: '/images/categories/people.png',
  },
  {
    id: 'dapps',
    title: 'Decentralized Applications',
    icon: RiCopperDiamondLine,
    description:
      'The Decentralized Application (dapps) category covers everything from time-weighted average market maker (TWAMM) like Fraxswap to DeFi lending protocols like Aave.',
    cardImage: '/images/categories/dapp-card.png',
    heroImage: '/images/categories/dapps.jpg',
  },
  {
    id: 'organizations',
    title: 'Organizations',
    icon: RiOrganizationChart,
    description:
      'The Organizatons category covers companies and other organizations that develop, implement, or utilize blockchain technology.',
    cardImage: '/images/categories/organization-card.png',
    heroImage: '/images/categories/organizations.jpg',
  },
]
