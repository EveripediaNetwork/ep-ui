import config from '@/config'
import { utils } from 'ethers'

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
    image: '/images/polygon.svg',
    name: 'Polygon',
    isActive: true,
    chainId: utils.hexValue(config.mumbaiTestnetChainId),
  },
  {
    id: 2,
    image: '/images/ethereum2.svg',
    name: 'Ethereum',
    isActive: false,
    chainId: utils.hexValue(config.ethereumMainnetChainId),
  },
  {
    id: 3,
    image: '/images/bsc.svg',
    name: 'Bsc',
    isActive: false,
    chainId: utils.hexValue(config.binanceSmartChainId),
  },
]
