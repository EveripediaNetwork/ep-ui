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
    chainId: '0x13881',
  },
  {
    id: 2,
    image: '/images/ethereum2.svg',
    name: 'Ethereum',
    isActive: false,
    chainId: '0x1',
  },
  {
    id: 3,
    image: '/images/bsc.svg',
    name: 'Bsc',
    isActive: false,
    chainId: '0x38',
  },
]
