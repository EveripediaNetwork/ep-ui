import {
  RecordTypeNonPrimitive,
  RecordTypePicker,
  Wiki,
  BaseTag,
  User,
  Image,
  BaseCategory,
} from '@everipedia/iq-utils'

export type Activity = {
  id: string
  wikiId: string
  type: string
  content: Wiki[]
  datetime: string
  ipfs?: string
}

export type ActivityCardProps = {
  tags: BaseTag[]
  summary: string
  isNotifSubCard?: boolean
  link: string
}

export type ActivityCardBottomProps = {
  editor: User
  isNotifSubCard: boolean
  lastModTimeStamp?: string
  activity: 'New' | 'Edited'
  tags: BaseTag[]
}

export type ActivityCardImageProps = {
  title: string
  link: string
  isNotifSubCard: boolean
  wikiImgObj?: Image[]
}

export type ActivityCardTopProps = {
  title: string
  activity: string
  category?: BaseCategory
  link: string
}

export type ActivityBodyCardProps = {
  title: string
  summary: string
  editor: User
  lastModTimeStamp?: string
  activityId?: string
  wikiId: string
  type?: string
  categories: BaseCategory[]
  tags: BaseTag[]
  wikiImgObj?: Image[]
  ipfs?: string
  isNotifSubCard?: boolean
}

export type ActivityBuilder<
  NonPrimitiveOverrides extends RecordTypeNonPrimitive<Activity>,
  Keys extends keyof Activity,
> = RecordTypePicker<Activity, NonPrimitiveOverrides, Keys>
