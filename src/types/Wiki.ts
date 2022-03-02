export interface Category {
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
  value: string | boolean
}

export interface User {
  id: string
}

export interface Content {
  title: string
  content: string
  categories: Category[]
  tags: Tag[]
  images: Image[]
  metadata: MData[]
  user?: User
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
