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

export interface Media {
  id: string
  size?: string
  name?: string
  caption?: string
  thumbnail?: string
  source: 'IPFS_IMG' | 'VIMEO' | 'YOUTUBE' | 'IPFS_VID'
}

export enum EditorContentOverride {
  KEYWORD = '[OVERRIDE@EDITOR@MARKDOWN]',
}

export const CreateNewWikiSlug = '/*CREATE+NEW+WIKI*/'

export enum CommonMetaIds {
  PAGE_TYPE = 'page-type',
  REFERENCES = 'references',
  FACEBOOK_PROFILE = 'facebook_profile',
  INSTAGRAM_PROFILE = 'instagram_profile',
  TWITTER_PROFILE = 'twitter_profile',
  LINKEDIN_PROFILE = 'linkedin_profile',
  YOUTUBE_PROFILE = 'youtube_profile',
  COINGECKO_PROFILE = 'coingecko_profile',
}

export enum ValidatorCodes {
  VALID_WIKI = 'VALID_WIKI',
  LANGUAGE = 'LANGUAGE_ERROR',
  USER = 'USER_ERROR',
  WORDS = 'WORD_COUNT_ERROR',
  CATEGORY = 'CATEGORY_ERROR',
  IMAGE = 'IMAGE_ERROR',
  TAG = 'TAG_ERROR',
  URL = 'EXTERNAL_URL_ERROR',
  METADATA = 'METADATA_ERROR',
  SUMMARY = 'SUMMARY_ERROR',
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

export interface CiteReference {
  id: string
  url: string
  description: string
  timestamp: string
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
  media?: Media[]
  user: User
  metadata: UpdatedMetaDataInterface
  version: number
  language: LanguagesISOEnum
  updated?: string
  created?: string
  author: User
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
  | 'updated'
>
