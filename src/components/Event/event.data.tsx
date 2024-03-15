import { RiBankFill, RiCalendarEventFill, RiScan2Fill } from 'react-icons/ri'

export interface IEventData {
  id: number
  location: string
  title: string
  date: string
  src?: string
  type?: string
  tags?: string[]
  excerpt?: string
  speakers?: { name: string; imageSrc: string }[]
}

export const EventInterestData = [
  'Blockchains',
  'BinanceSmartChain',
  'Protocols',
  'Conference',
  'Cexes',
  'Ethereum',
  'Festival',
  'Forum',
  'Games',
  'Hackaton',
  'Bitcoin',
  'AI',
  'DEXes',
  'Online',
  'Polygon',
  'Solana',
]

export const eventMockData: IEventData[] = [
  {
    id: 1,
    title: 'Crypto Finance Conference',
    excerpt:
      'CFC St. Moritz is a curated, application-only event designed for NFT investors and decision-makers. It admits only 250 international UHNWI, institutional investors, funds, and family offices.',
    tags: ['Crypto', 'BTC', 'NFTs', 'Blockchain', 'Ethereum', 'Finance'],
    location: 'St. Moritz, Switzerland, Europe',
    type: 'Conference',
    date: '2024-01-10/2024-01-13',
    speakers: [
      {
        name: 'Jaynti Kanani',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Anurag Arjun',
        imageSrc: '/images/svg-images/user-2.png',
      },
      {
        name: 'Sandeep Nailwal',
        imageSrc: '/images/svg-images/user-3.png',
      },
      {
        name: 'Mihailo Bjelic',
        imageSrc: '/images/svg-images/user-4.png',
      },
    ],
  },
  {
    id: 2,
    title: 'Quantum Miami 2024',
    excerpt:
      'Past Quantum Miami editions have brought together some of the world’s top crypto figures such as Mark Cuban and Ethereum co-founder Vitalik Buterin to share their insights. In 2024, the event’s theme is “Bridging Blockchain to Mainstream Industries”.',
    tags: ['Crypto', 'BTC', 'NFTs', 'Blockchain', 'Ethereum'],
    location: 'James L. Knight Center (Miami, Florida), North America',
    type: 'Conference',
    date: '2024-01-10/2024-01-13',
    speakers: [
      {
        name: 'Emin Gun',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Kevin Sekniqi',
        imageSrc: '/images/svg-images/user-2.png',
      },
      {
        name: 'Maofan Ted',
        imageSrc: '/images/svg-images/user-3.png',
      },
    ],
  },
  {
    id: 3,
    title: 'The Blockchain Event',
    excerpt:
      'The Blockchain Event serves as a platform for leaders and technologists where they can create and implement real-time solutions to disrupt industries and help businesses adapt to evolving market demands.',
    tags: ['Crypto', 'BTC', 'NFTs', 'Blockchain', 'Ethereum'],
    type: 'Conference',
    location:
      'Greater Broward County Convention Center (Fort Lauderdale, Florida), North America',
    date: '2024-01-10',
    speakers: [
      {
        name: 'Reeve Collins',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Brock Pierce',
        imageSrc: '/images/svg-images/user-2.png',
      },
      {
        name: 'Craig Sellars',
        imageSrc: '/images/svg-images/user-3.png',
      },
    ],
  },
  {
    id: 4,
    title: 'METAVSUMMIT',
    excerpt:
      'METAVSUMMIT is an event that specializes in helping Web 3.0 Companies (Blockchain, Metaverse and NFTs) and Investors meet under one roof for them to be able to create long-term business relationships.',
    tags: ['Metaverse', 'Crypto', 'Web 3.0', 'NFTs', 'Blockchain', 'Ethereum'],
    location: 'Dubai, UAE, Asia',
    type: 'Conference',
    date: '2024-02-11',
    speakers: [
      {
        name: 'Jed McCaleb',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Arthur Britto',
        imageSrc: '/images/svg-images/user-2.png',
      },
      {
        name: 'David Schwar',
        imageSrc: '/images/svg-images/user-3.png',
      },
    ],
  },
  {
    id: 5,
    title: 'WEB3 Revolution Cyprus Blockchain EXPO 2024',
    excerpt:
      'This groundbreaking event will bring together the brightest minds and industry leaders in the digital realm, providing a platform for collaboration, inspiration, and the exploration of new possibilities in the web3 space.',
    tags: ['Metaverse', 'Crypto', 'Web 3.0', 'NFTs', 'Blockchain', 'Ethereum'],
    location: 'Limassol, Cyprus, Europe',
    type: 'Hackathon',
    date: '2024-02-11',
    speakers: [
      {
        name: 'Jeremy Allaire',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Sean Neville',
        imageSrc: '/images/svg-images/user-2.png',
      },
    ],
  },
  {
    id: 6,
    title: '13th Annual London Finance and Capital Markets Conference',
    excerpt:
      'This groundbreaking event will bring together the brightest minds and industry leaders in the digital realm, providing a platform for collaboration, inspiration, and the exploration of new possibilities in the web3 space.',
    tags: ['Metaverse', 'Crypto', 'Web 3.0', 'NFTs', 'Blockchain', 'Ethereum'],
    location: 'One Great George Street, London, England, Europe',
    type: 'Conference',
    date: '2024-02-16',
    speakers: [
      {
        name: 'Gavin Wood',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Robert Habermeier',
        imageSrc: '/images/svg-images/user-2.png',
      },
    ],
  },
  {
    id: 7,
    title: 'ETHDenver Innovation Festival',
    excerpt:
      'ETHDenver is considered the largest Web3 #BUIDLathon in the US. The 2024 blockchain event will bring together Ethereum protocol enthusiasts, designers, and developers from all over the world.',
    tags: ['Crypto', 'BTC', 'NFTs', 'Blockchain', 'Ethereum'],
    type: 'Festival',
    location:
      'National Western Complex (aka Spork Castle), Denver Colorado, North America',
    date: '2024-02-16',
    speakers: [
      {
        name: 'Emin Gun',
        imageSrc: '/images/svg-images/user-1.png',
      },
      {
        name: 'Kevin Sekniqi',
        imageSrc: '/images/svg-images/user-2.png',
      },
      {
        name: ' Maofan Ted',
        imageSrc: '/images/svg-images/user-3.png',
      },
    ],
  },
]

export const trendingEventData: IEventData[] = [
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

export const eventDetailsData = [
  {
    title: 'CONFERENCE HALL',
    content:
      'Immerse yourself in the intersection of cutting-edge technologies at this blockchain-focused conference with engaging talks, panels, and expert insights.',
  },
  {
    title: 'EXHIBITION SPACE',
    content:
      'Connect and explore at the bustling showcase: This highlights the dual focus on networking and learning.',
  },
  {
    title: 'NETWORKING',
    content:
      'The event offers the opportunity for peer-to-peer (P2P) communication, facilitating meaningful connections.',
  },
  {
    title: 'Corporate Web3',
    content:
      'Including, Web3 & Luxury, Brands in Web3, Creators Economy, NFT Gaming & Metaverse.',
  },
  {
    title: 'Tech Builders',
    content:
      'Artificial Intelligence, Scalability, Interoperability, Data management',
  },
  {
    title: 'GALA DINNER',
    content:
      'Our gala dinner transforms the event into an unparalleled networking experience, seamlessly weaving connections throughout the evening and making it truly unique.',
  },
]

export const speakerData = [
  {
    name: 'Denelle Dixon',
    position: 'CEO & Executive Director of Stellar Development Foundation',
  },
  {
    name: 'Marcus David',
    position: 'CEO and co-founder of Lightspark',
  },
  {
    name: 'Attanasio Silvia',
    position: 'Head of Innovation at ABI & Member of the ECB',
  },
  {
    name: 'Teng David',
    position: 'CEO of Binance singapore',
  },
  {
    name: 'Shaikh Mo',
    position: 'Co-Founder and CEO of Aptos Labs',
  },
  {
    name: 'Alexandre Dreyfus',
    position: 'CEO of Chiliz',
  },
  {
    name: 'Stephan Richardson',
    position: 'Head of APAC & SVP',
  },
  {
    name: 'Alice Stork',
    position: 'Co-Founder of ICL Communications',
  },
]

export const sponsorData = [
  {
    src: '/images/svg-images/sponsor-1.svg',
    srcDark: '/images/svg-images/sponsor-1-dark.svg',
    width: 181,
    height: 45,
  },
  {
    src: '/images/svg-images/sponsor-2.svg',
    srcDark: '/images/svg-images/sponsor-2-dark.svg',
    width: 181,
    height: 56,
  },
  {
    src: '/images/svg-images/sponsor-3.svg',
    srcDark: '/images/svg-images/sponsor-3.svg',
    width: 91,
    height: 77,
  },
  {
    src: '/images/svg-images/sponsor-4.svg',
    srcDark: '/images/svg-images/sponsor-4.svg',
    width: 181,
    height: 70,
  },
  {
    src: '/images/svg-images/sponsor-5.svg',
    srcDark: '/images/svg-images/sponsor-5.svg',
    width: 181,
    height: 34,
  },
  {
    src: '/images/svg-images/sponsor-6.svg',
    srcDark: '/images/svg-images/sponsor-6-dark.svg',
    width: 181,
    height: 48,
  },
  {
    src: '/images/svg-images/sponsor-7.svg',
    srcDark: '/images/svg-images/sponsor-7-dark.svg',
    width: 181,
    height: 59,
  },
  {
    src: '/images/svg-images/sponsor-8.svg',
    srcDark: '/images/svg-images/sponsor-8-dark.svg',
    width: 82,
    height: 78,
  },
  {
    src: '/images/svg-images/sponsor-9.svg',
    srcDark: '/images/svg-images/sponsor-9.svg',
    width: 162,
    height: 78,
  },
  {
    src: '/images/svg-images/sponsor-10.svg',
    srcDark: '/images/svg-images/sponsor-10.svg',
    width: 186,
    height: 54,
  },
  {
    src: '/images/svg-images/sponsor-11.svg',
    srcDark: '/images/svg-images/sponsor-11.svg',
    width: 181,
    height: 80,
  },
  {
    src: '/images/svg-images/sponsor-12.svg',
    srcDark: '/images/svg-images/sponsor-12.svg',
    width: 181,
    height: 47,
  },
]

export const eventFilterData = [
  {
    icon: <RiCalendarEventFill />,
    title: 'Date',
    filter: ['Next Week', 'Next Month', 'Custom Range'],
  },
  // {
  //   icon: <RiMapPinRangeFill />,
  //   title: 'Location',
  //   filter: [
  //     'Asia',
  //     'Africa',
  //     'Europe',
  //     'North America',
  //     'South America',
  //     'Austria/Ocenia',
  //   ],
  // },
  {
    icon: <RiScan2Fill />,
    title: 'Event Type',
    filter: ['Conference', 'Hackathon', 'Forum', 'Festival', 'Online'],
  },
  {
    icon: <RiBankFill />,
    title: 'Blockchain',
    filter: [
      'Bitcoin',
      'Ethereum',
      'Polygon',
      'Solana',
      'Cardano',
      'Binance-coin',
    ],
  },
]
