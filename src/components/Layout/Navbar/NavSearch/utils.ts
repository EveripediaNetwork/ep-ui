export type ArticleType = {
  id: string
  image: string
  title: string
  description: string
  tag: string
  views: number
}

export type CategoryType = {
  id: string
  title: string
  tag: string
  views: number
}

export type ProfileType = {
  id: string
  image: string
  name: string
  bio: string
}

export const SAMPLE_ARTICLES: ArticleType[] = [
  {
    id: 'fdeffef',
    image: 'https://picsum.photos/200',
    title: 'Carson Block',
    description:
      'Writer’s block is a condition primarily associated with writing and this must be truncated',
    tag: 'Thing',
    views: 53,
  },
]

export const SAMPLE_CATEGORIES: CategoryType[] = [
  {
    id: 'fdeffef',
    title: 'EOS Block Producer',
    tag: 'Organization',
    views: 14000,
  },
]

export const SAMPLE_PROFILES: ProfileType[] = [
  {
    id: 'fdeffef',
    image: 'https://picsum.photos/200',
    name: 'Block Boi',
    bio: '@epid-g-jayh847',
  },
]
