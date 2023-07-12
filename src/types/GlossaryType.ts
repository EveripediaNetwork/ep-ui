import { Wiki } from '@everipedia/iq-utils'

export type GlossaryAlphabetsProps = {
  shouldBeFixed: boolean
  heightOfElement: number
  item: string
}

export type GlossaryFilterSectionProps = {
  searchText: string
  searchPage: (value: string) => void
  shouldBeFixed: boolean
  setSearchText: (value: string) => void
  activeIndex: number | undefined
  setActiveIndex: (value: number) => void
}

export type GlosssaryIconButtonProps = {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

export type GlossaryItemType = {
  highlightText: string
  glossary: Wiki[]
  glossaryAlphabets: string[]
}

export type GlossaryWikiCardProps = {
  highlightText: string
  wikiId: string
  title: string
  summary: string
}
