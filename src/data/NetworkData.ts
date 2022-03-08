type Network = {
  id: number
  image: string
  name: string
  isActive: boolean
}

export const Networks: Network[] = [
  {
    id: 1,
    image: '/image/polygon.svg',
    name: 'Polygon',
    isActive: true,
  },
  {
    id: 2,
    image: '/image/ethereum2.svg',
    name: 'Ethereum',
    isActive: false,
  },
  {
    id: 3,
    image: '/image/bsc.svg',
    name: 'Bsc',
    isActive: false,
  },
]
