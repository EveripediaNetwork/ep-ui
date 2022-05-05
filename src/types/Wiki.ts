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

export enum CommonMetaIds {
  PAGE_TYPE = 'page-type',
  TWITTER_PROFILE = 'twitter-profile',
  REFERENCES = 'references',
}

export enum EditSpecificMetaIds {
  COMMIT_MESSAGE = 'commit-message',
  WORDS_CHANGED = 'words-changed',
  PERCENT_CHANGED = 'percent-changed',
  BLOCKS_CHANGED = 'blocks-changed',
}

export enum WikiRootBlocks {
  TITLE = 'title',
  CONTENT = 'content',
  WIKI_IMAGE = 'wiki-image',
  SUMMARY = 'summary',
  TAGS = 'tags',
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
  GENERIC = 'generic',
  PERSON = 'Person',
  EVENT = 'Event',
  DAPP = 'Dapp',
  NFT = 'NFT',
  TOKEN = 'Token',
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
  transactionHash?: string
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
