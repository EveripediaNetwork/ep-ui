export type Network = {
  id: number
  image: string
  name: string
  isActive: boolean
}

export const Networks: Network[] = [
  {
    id: 1,
    image: '/images/polygon.svg',
    name: 'Polygon',
    isActive: true,
  },
  {
    id: 2,
    image: '/images/ethereum2.svg',
    name: 'Ethereum',
    isActive: false,
  },
  {
    id: 3,
    image: '/images/bsc.svg',
    name: 'Bsc',
    isActive: false,
  },
]
