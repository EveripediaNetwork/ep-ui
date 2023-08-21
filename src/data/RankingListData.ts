export type RankinglistHeadProps = {
  label: string
}

export const CATEGORIES_WITH_INDEX = {
  cryptocurrencies: 0,
  nfts: 1,
}

export const RankingListHead: RankinglistHeadProps[] = [
  {
    label: '#',
  },
  {
    label: 'Name',
  },
  {
    label: 'Price',
  },
  {
    label: 'Marketcap',
  },
  {
    label: 'Founders',
  },
  {
    label: 'Blockchain',
  },
  {
    label: 'Date Founded',
  },
]
