export interface BaseCategory {
  id: string
  title: string
}

export interface Tag {
  id: string
}

export interface Image {
  id: string
  type: string | ArrayBuffer | null
}

export interface MData {
  id: string
  value: string
}

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

export interface Content {
  id?:string,
  title: string
  content: string
  categories: BaseCategory[]
  tags: Tag[]
  images: Image[]
  metadata: MData[]
  user?: User
  updated?: string
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
  version: number
  content: Content
  language: LanguagesISOEnum
}
