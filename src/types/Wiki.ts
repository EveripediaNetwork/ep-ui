export interface BaseCategory {
  id: string
  title: string
}

export interface Tag {
  id: string
}

export interface Image {
  id: string
  type: ArrayBuffer | string | File | Blob
}

export interface MData {
  id: string
  value: string
}
export type UpdatedMetaDataInterface = Array<MData>

export interface User {
  id: string
}

export enum PageTypeName {
  PERSON = 'Person',
  PLACE_LOCATION = 'Place / Location',
  ORGANIZATION_COMPANY_INSTITUTION = 'Organization / Company / Institution',
  EVENT = 'Event',
  LIST_RANKING = 'List / Ranking',
  PRODUCT_MERCHANDISE = 'Product / Merchandise',
  CREATIVE_WORK_ART = 'Create Work / Art',
  OTHER = 'Other',
}

export type PageType = {
  type: PageTypeName
  templateText: string
}

enum LanguagesValuesEnum {
  SPANISH = 'Español',
  ENGLISH = 'English',
  CHINESE = '中文',
  KOREAN = '한국어',
}

export enum LanguagesISOEnum {
  EN = 'en',
  ES = 'es',
  ZH = 'zh',
  KO = 'ko',
}

type LanguagesType = Record<LanguagesISOEnum, LanguagesValuesEnum>

export const Languages: LanguagesType = {
  en: LanguagesValuesEnum.ENGLISH,
  es: LanguagesValuesEnum.SPANISH,
  zh: LanguagesValuesEnum.CHINESE,
  ko: LanguagesValuesEnum.KOREAN,
}

export interface Wiki {
  id: string
  commitMessage?: string
  ipfs?: string
  summary?: string
  title: string
  content: string
  categories: BaseCategory[]
  tags: Tag[]
  images?: Image[]
  user: User
  metadata: UpdatedMetaDataInterface
  version: number
  language: LanguagesISOEnum
  updated?: string
  created?: string
}

export type WikiPreview = Pick<
  Wiki,
  | 'id'
  | 'title'
  | 'summary'
  | 'content'
  | 'tags'
  | 'images'
  | 'categories'
  | 'user'
>
