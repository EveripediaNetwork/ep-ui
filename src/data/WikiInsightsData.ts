import { RelatedMedia, WikiInsights } from '@/types/WikiInsightsDataType'

export const sampleProfileStatistics: WikiInsights[] = [
  {
    type: 'statistic',
    title: 'Market Cap',
    content: {
      value: '$861,618,023.80',
      change: '0.17%',
      changeDirection: 'increase',
    },
  },
  {
    type: 'statistic',
    title: 'Holders',
    content: {
      value: '6,382',
      change: '0.17%',
      changeDirection: 'increase',
    },
  },
  {
    type: 'statistic',
    title: 'Diluted Market Cap',
    content: {
      value: '$183,710,797',
      change: '0.09%',
      changeDirection: 'increase',
    },
  },
  {
    type: 'statistic',
    title: 'Volume',
    titleTag: '24h',
    content: {
      value: '$3,642,982.55',
      change: '69.03%',
      changeDirection: 'decrease',
    },
  },
]

export const sampleProfileSummary: WikiInsights[] = [
  {
    type: 'address',
    title: 'Contract',
    content: '0x579CEa1889991f68aCc35Ff5c3dd0621fF29b0C9',
  },
  {
    type: 'url',
    title: 'Official site',
    content: 'https://boredapeyachtclub.com',
  },
  {
    type: 'statistic',
    title: 'Holders',
    content: {
      value: '6,382',
      change: '0.17%',
      changeDirection: 'increase',
    },
  },
  {
    type: 'socials',
    title: 'Social profiles',
    content: [
      { icon: 'RiTwitterFill', url: 'https://twitter.com/boredapeyacht' },
      { icon: 'RiFacebookFill', url: 'https://facebook.com/boredapeyacht' },
      { icon: 'RiInstagramFill', url: 'https://instagram.com/boredapeyacht' },
    ],
  },
  {
    type: 'text',
    title: 'Collection',
    content: '10,000 NFTs',
  },
  {
    type: 'explorers',
    title: 'Explorers',
    content: [
      'https://bloks.io/account/everipediaiq',
      'https://eosflare.io/token/everipediaiq/IQ',
      'https://www.eosx.io/account/everipediaiq?partner=coinmarketcap',
      'https://etherscan.io/token/0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
    ],
  },
]
export const sampleRelatedMedia: RelatedMedia[] = [
  {
    type: 'image',
    link: 'https://picsum.photos/seed/first-sample-image/1600/1600',
    caption: 'First sample image',
  },
  {
    type: 'image',
    link: 'https://picsum.photos/seed/second-sample-image/1400/1580',
    caption: 'Second sample image',
  },
  {
    type: 'youtube',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Youtube video',
  },
  {
    type: 'vimeo',
    link: 'https://vimeo.com/153481489',
    caption: 'Vimeo video',
  },
  {
    type: 'video',
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BOTAzZGQyNWQtZTg4Yi00OTRhLTg3ZjktOTUzNDJjMmIwNjVhXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_.jpg',
    link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'Sample video',
  },
  {
    type: 'audio',
    link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    caption: 'Fifth sample image',
  },
]
