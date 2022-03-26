import { WikiInsights } from '@/types/WikiInsightsDataType'

export const sampleProfileStatistics: WikiInsights[] = [
  {
    type: 'statistic',
    title: 'Market Cap',
    content: '$861,618,023.80',
    change: '0.17%',
    changeDirection: 'increase',
  },
  {
    type: 'statistic',
    title: 'Holders',
    content: '6,382',
    change: '0.17%',
    changeDirection: 'increase',
  },
  {
    type: 'statistic',
    title: 'Diluted Market Cap',
    content: '$183,710,797',
    change: '0.09%',
    changeDirection: 'increase',
  },
  {
    type: 'statistic',
    title: 'Volume',
    titleTag: '24h',
    content: '$3,642,982.55',
    change: '69.03%',
    changeDirection: 'decrease',
  },
]

export const sampleProfileSummary: WikiInsights[] = [
  {
    type: 'address',
    title: 'Contract',
    content: '0xbed9...fb4D',
  },
  {
    type: 'url',
    title: 'Official site',
    content: 'https://boredapeyachtclub.com',
  },
  {
    type: 'statistic',
    title: 'Holders',
    content: '6,382',
    change: '0.17%',
    changeDirection: 'increase',
  },
  {
    title: 'Collection',
    content: '10,000 NFTs',
  },
]
