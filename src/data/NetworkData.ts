import config from '@/config'

export type Network = {
  id: number
  image: string
  name: string
  isActive: boolean
  chainId: string
}

export const Networks: Network[] = [
  {
    id: 1,
    image: '/images/logos/polygon.svg',
    name: 'Polygon',
    isActive: config.isProduction,
    chainId: '0x13881',
  },
  {
    id: 2,
    image: '/images/logos/braindao-logo.svg',
    name: 'IQ',
    isActive: !config.isProduction,
    chainId: '0x333133333737',
  },
]
