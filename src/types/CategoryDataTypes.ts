import type { IconType } from 'react-icons'
import type { Image as ImageType, User } from '@everipedia/iq-utils'

export type CategoryDataType = {
  id: string
  title: string
  icon: IconType
  description: string
  cardImage: string
  heroImage: string
}
export type CategoryLink = {
  id: string
  title: string
  icon: string
}

export type CategoryCardProps = {
  imageCard: string
  coverIcon: IconType
  title: string
  brief: string
  categoryId: string
}

export type TrendingCategoryItemProps = {
  title: string
  brief: string
  editor: User
  lastModTimeStamp?: string
  wikiId?: string
  WikiImgObj?: ImageType[]
}

export type CategoryAndWikiDataProps = {
  title: string
  id: string
  wikis: {
    id: string
    title: string
    summary: string
    user: {
      id: string
      profile: {
        avatar: string
        username: string
        id: string
      }
    }
    images: {
      id: string
      type: string
    }[]
  }[]
}
