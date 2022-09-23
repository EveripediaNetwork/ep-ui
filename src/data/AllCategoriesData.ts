import {
  RiBitCoinFill,
  RiExchangeBoxFill,
  RiImage2Fill,
  RiMoneyCnyCircleFill,
  RiTeamFill,
  RiUser3Fill,
} from 'react-icons/ri'

export const AllCategoriesData = [
  {
    id: 'nfts',
    title: 'NFTs',
    icon: RiImage2Fill,
    description:
      'The NFTs (non-fungible tokens) category covers all things NFT from collections like the Bored Ape Yacht Club to games like Axie Infinity to artists like Beeple.',
    cardImage: '/images/categories/nfts-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'Decentralized Finance',
    icon: RiMoneyCnyCircleFill,
    description:
      'The Decentralized Finance (DeFi) category covers everything from stablecoin projects like Frax Finance to concepts like Yield Farming to the oracles which power DeFi like Chainlink.',
    cardImage: '/images/categories/defi-card.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'Exchanges',
    icon: RiExchangeBoxFill,
    description:
      'The Exchanges category covers all crypto exchanges including both centralized exchanges like Binance or Coinbase and decentralized exchanges like Uniswap or Quickswap.',
    cardImage: '/images/categories/exchanges-card.png',
    heroImage: '/images/categories/exchanges.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'Cryptocurrencies',
    icon: RiBitCoinFill,
    description:
      'This cryptocurrencies category covers all cryptocurrencies from Bitcoin to IQ. ',
    cardImage: '/images/categories/cryptocurrencies-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'DAOs',
    icon: RiTeamFill,
    description:
      'The DAOs category covers decentralized autonomous organizations of all kinds from DeFi DAOs like Olympus DAO to knowledge focused DAOs like BrainDAO.',
    cardImage: '/images/categories/daos-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'People in crypto',
    icon: RiUser3Fill,
    description:
      'The People in Crypto category covers everyone working to grow the crypto space from developers to artists to marketers to policy makers and everyone in between.',
    cardImage: '/images/categories/people-card.png',
    heroImage: '/images/categories/people.png',
  },
]
