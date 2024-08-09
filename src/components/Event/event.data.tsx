import {
  RiBankFill,
  RiCalendarEventFill,
  RiMapPinRangeFill,
  RiScan2Fill,
} from 'react-icons/ri'

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
  'Hackathon',
  'Bitcoin',
  'AI',
  'DEXes',
  'Online',
  'Polygon',
  'Solana',
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

export const eventFilterData = [
  {
    icon: <RiCalendarEventFill />,
    title: 'date',
    filter: [
      { id: 'next week', title: 'Next Week' },
      { id: 'next month', title: 'Next Month' },
      { id: 'custom range', title: 'Custom Range' },
    ],
  },
  {
    icon: <RiMapPinRangeFill />,
    title: 'location',
    filter: [
      { id: 'asia', title: 'Asia' },
      { id: 'africa', title: 'Africa' },
      { id: 'europe', title: 'Europe' },
      { id: 'north america', title: 'North America' },
      { id: 'south america', title: 'South America' },
      { id: 'australia', title: 'Australia' },
    ],
  },
  {
    icon: <RiScan2Fill />,
    title: 'eventType',
    filter: [
      { id: 'conference', title: 'Conference' },
      { id: 'hackathon', title: 'Hackathon' },
      { id: 'forum', title: 'Forum' },
      { id: 'festival', title: 'Festival' },
      { id: 'online', title: 'Online' },
    ],
  },
  {
    icon: <RiBankFill />,
    title: 'Blockchain',
    filter: [
      { id: 'bitcoin', title: 'Bitcoin' },
      { id: 'ethereum', title: 'Ethereum' },
      { id: 'polygon', title: 'Polygon' },
      { id: 'solana', title: 'Solana' },
      { id: 'cardano-ada', title: 'Cardano' },
      { id: 'binance-coin', title: 'BNB' },
    ],
  },
]
