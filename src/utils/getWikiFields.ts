import { BaseCategory, MData, Wiki } from '@/types/Wiki'

export const getWikiMetadataById = (wiki: Wiki, id: string) =>
  wiki.content.metadata.find((m: MData) => m.id === id)

export const getCategoryById = (wiki: Wiki, id: string) =>
  wiki.content.categories.find((c: BaseCategory) => c.id === id)
