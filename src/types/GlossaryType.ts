import { Wiki } from '@everipedia/iq-utils'
import { TFunction } from 'i18next'

export type GlossaryAlphabetsProps = {
  shouldBeFixed: boolean
  heightOfElement: number
  item: string
  t: TFunction<'glossary', undefined>
}

export type GlossaryFilterSectionProps = {
  searchText: string
  searchPage: (value: string) => void
  shouldBeFixed: boolean
  setSearchText: (value: string) => void
  activeIndex: number | undefined
  setActiveIndex: (value: number) => void
  t: TFunction<'glossary', undefined>
}

export type GlosssaryIconButtonProps = {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

export type GlossaryItemType = {
  highlightText: string
  glossary: Wiki[]
  glossaryAlphabets: { id: string; label: string }[]
  t: TFunction<'glossary', undefined>
}

export type GlossaryWikiCardProps = {
  highlightText: string
  wikiId: string
  title: string
  summary: string
}
