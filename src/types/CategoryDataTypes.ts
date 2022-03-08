import { IconType } from 'react-icons/lib'

export type CategoryDataType = Array<CategoryObjDataType>

export type CategoryObjDataType = {
  slug: string
  title: string
  description: string
  imageCard: string
  imageHero: string
  icon: IconType
}
