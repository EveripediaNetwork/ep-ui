import {
  BsCurrencyBitcoin,
  BsCurrencyExchange,
  BsFillFileImageFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsRecycle,
} from 'react-icons/bs'

export const AllCategoriesData = [
  {
    id: 'nfts',
    title: 'NFTs',
    icon: BsFillFileImageFill,
    description:
      'The NFTs (non-fungible tokens) category covers all things NFT from collections like the Bored Ape Yacht Club to games like Axie Infinity to artists like Beeple.',
    cardImage: '/images/categories/nfts-card.png',
    heroImage: '/images/categories/nfts.png',
  },
  {
    id: 'defi',
    title: 'Decentralized Finance',
    icon: BsRecycle,
    description:
      'The Decentralized Finance (DeFi) category covers everything from stablecoin projects like Frax Finance to concepts like Yield Farming to the oracles which power DeFi like Chainlink.',
    cardImage: '/images/categories/defi-card.png',
    heroImage: '/images/categories/defi.png',
  },
  {
    id: 'exchanges',
    title: 'Exchanges',
    icon: BsCurrencyExchange,
    description:
      'The Exchanges category covers all crypto exchanges including both centralized exchanges like Binance or Coinbase and decentralized exchanges like Uniswap or Quickswap.',
    cardImage: '/images/categories/exchanges-card.png',
    heroImage: '/images/categories/exchanges.png',
  },
  {
    id: 'cryptocurrencies',
    title: 'Cryptocurrencies',
    icon: BsCurrencyBitcoin,
    description:
      'This cryptocurrencies category covers all cryptocurrencies from Bitcoin to IQ. ',
    cardImage: '/images/categories/cryptocurrencies-card.png',
    heroImage: '/images/categories/cryptocurrencies.jpg',
  },
  {
    id: 'daos',
    title: 'DAOs',
    icon: BsFillPeopleFill,
    description:
      'The DAOs category covers decentralized autonomous organizations of all kinds from DeFi DAOs like Olympus DAO to knowledge focused DAOs like BrainDAO.',
    cardImage: '/images/categories/daos-card.png',
    heroImage: '/images/categories/daos.png',
  },
  {
    id: 'people',
    title: 'People in crypto',
    icon: BsFillPersonFill,
    description:
      'The People in Crypto category covers everyone working to grow the crypto space from developers to artists to marketers to policy makers and everyone in between.',
    cardImage: '/images/categories/people-card.png',
    heroImage: '/images/categories/people.png',
  },
]
