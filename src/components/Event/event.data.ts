interface IEventData {
  id: number
  location: string
  title: string
  date: string
  src: string
}

export const EventInterestData = [
  'Blockchain',
  'crypto',
  'protocols',
  'Nfts',
  'Ethereum',
  'Technology',
  'Metaverse',
  'Games',
  'collectibles',
  'Bitcoin',
  'AI',
  'DEXes',
  'Artist',
  'Non-fungible',
  'Solana',
]

export const eventMockData: IEventData[] = [
  {
    id: 1,
    location: 'Le Carrousel du Louvre (Paris, France)',
    title: '5th Edition Paris Blockchain Week',
    date: 'April 8-12, 2024',
    src: '/images/blockchain-2.png',
  },
  {
    id: 2,
    location: 'Rai, Amsterdam.',
    title: 'Blockchain Expo Europe',
    date: 'October 1-02, 2024',
    src: '/images/blockchain-expo.png',
  },
  {
    id: 3,
    location: 'AsiaWorld Expo, Airport Expo Blvd...',
    title: 'Wow summit in Hong Kong',
    date: 'march, 26-27,2024',
    src: '/images/blockchain-3.png',
  },
  {
    id: 4,
    location: 'Dubai, Festival Arena',
    title: 'Blockchain Life 2024',
    date: 'April 15-16, 2024',
    src: '/images/blockchain-life.png',
  },
  {
    id: 5,
    location: 'Le Carrousel du Louvre (Paris, France)',
    title: '5th Edition Paris Blockchain Week',
    date: 'April 8-12, 2024',
    src: '/images/blockchain-2.png',
  },
  {
    id: 6,
    location: 'Rai, Amsterdam.',
    title: 'Blockchain Expo Europe',
    date: 'October 1-02, 2024',
    src: '/images/blockchain-expo.png',
  },
]

export const nearByEventData = [
  {
    title: 'Self custodial Zucamp: Proof of Retreat',
  },
  {
    title: 'Move DevConf',
  },
  {
    title: 'CNX NFT DAY',
  },
  {
    title: 'Crypto Peaks',
  },
  {
    title: 'International Conference on Blockchain and Cryptocurrencies',
  },
]

export const popularEventData = [
  {
    title: 'World Crpyto Forum',
  },
  {
    title: 'ETHDenver Innovation Festival',
  },
  {
    title: 'Paris blockchain week',
  },
  {
    title: 'Wow summit in Hong Kong',
  },
  {
    title: 'Superteam UAE Founder’s villa',
  },
]
