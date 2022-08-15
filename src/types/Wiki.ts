import { ProfileData } from './ProfileType'

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

export const EditorContentOverride = '%OVERRIDE@EDITOR@MARKDOWN%'
export const CreateNewWikiSlug = '/*CREATE+NEW+WIKI*/'

export enum CommonMetaIds {
  PAGE_TYPE = 'page-type',
  REFERENCES = 'references',

  // other info
  WEBSITE = 'website',
  CONTRACT_URL = 'contract_url',

  // social Links
  EMAIL_URL = 'email_url',
  FACEBOOK_PROFILE = 'facebook_profile',
  INSTAGRAM_PROFILE = 'instagram_profile',
  TWITTER_PROFILE = 'twitter_profile',
  LINKEDIN_PROFILE = 'linkedin_profile',
  YOUTUBE_PROFILE = 'youtube_profile',
  DISCORD_PROFILE = 'discord_profile',
  REDDIT_URL = 'reddit_profile',
  TELEGRAM_URL = 'telegram_profile',
  GITHUB_URL = 'github_profile',
  COIN_MARKET_CAP = 'coinmarketcap_url',
  COINGECKO_PROFILE = 'coingecko_profile',

  // Explorers
  ETHERSCAN_PROFILE = 'etherscan_profile',
  ARBISCAN_PROFILE = 'arbiscan_profile',
  POLYGONSCAN_PROFILE = 'polygonscan_profile',
  BSCSCAN_PROFILE = 'bscscan_profile',
  OPTIMISTIC_ETHERSCAN_PROFILE = 'optimistic_etherscan_profile',
}

export const WikiPossibleSocialsList = [
  // other info
  CommonMetaIds.WEBSITE,
  CommonMetaIds.CONTRACT_URL,

  // social Links
  CommonMetaIds.EMAIL_URL,
  CommonMetaIds.FACEBOOK_PROFILE,
  CommonMetaIds.INSTAGRAM_PROFILE,
  CommonMetaIds.TWITTER_PROFILE,
  CommonMetaIds.LINKEDIN_PROFILE,
  CommonMetaIds.YOUTUBE_PROFILE,
  CommonMetaIds.REDDIT_URL,
  CommonMetaIds.TELEGRAM_URL,
  CommonMetaIds.DISCORD_PROFILE,
  CommonMetaIds.GITHUB_URL,
  CommonMetaIds.COIN_MARKET_CAP,
  CommonMetaIds.COINGECKO_PROFILE,

  // Explorers
  CommonMetaIds.ETHERSCAN_PROFILE,
  CommonMetaIds.ARBISCAN_PROFILE,
  CommonMetaIds.POLYGONSCAN_PROFILE,
  CommonMetaIds.BSCSCAN_PROFILE,
  CommonMetaIds.OPTIMISTIC_ETHERSCAN_PROFILE,
]

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
  ID_ERROR = 'ID_ERROR',
  GLOBAL_RATE_LIMIT = 'GLOBAL_RATE_LIMIT',
}

export enum EditSpecificMetaIds {
  COMMIT_MESSAGE = 'commit-message',
  WORDS_CHANGED = 'words-changed',
  PERCENT_CHANGED = 'percent-changed',
  BLOCKS_CHANGED = 'blocks-changed',
  WIKI_SCORE = 'wiki-score',
}

export enum WikiRootBlocks {
  TITLE = 'title',
  CONTENT = 'content',
  WIKI_IMAGE = 'wiki-image',
  SUMMARY = 'summary',
  TAGS = 'tags',
}

export interface MData {
  id: CommonMetaIds | EditSpecificMetaIds
  value: string
}

export interface User {
  id: string
  profile?: ProfileData | null
}

export interface Author {
  id: string | null
  profile?: ProfileData | null
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
  metadata: MData[]
  version: number
  language: LanguagesISOEnum
  updated?: string
  created?: string
  author: Author
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

export const whiteListedDomains = [
  'youtube.com/watch',
  'youtu.be',
  'vimeo.com',
  'alpha.everipedia.org/wiki',
  'beta.everipedia.org/wiki',
  'ipfs.everipedia.org/ipfs',
]
