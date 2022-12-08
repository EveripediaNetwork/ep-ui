import { Activity } from '@/types/ActivityDataType'
import {
  BaseCategory,
  CommonMetaIds,
  EditSpecificMetaIds,
  MData,
  Wiki,
} from '@everipedia/iq-utils'

export const getWikiMetadataById = (
  wiki: Wiki,
  id: CommonMetaIds | EditSpecificMetaIds,
) => wiki.metadata.find((m: MData) => m.id === id)

export const getActivityMetadataById = (activity: Activity, id: string) =>
  activity.content[0].metadata.find((m: MData) => m.id === id)

export const getCategoryById = (wiki: Wiki, id: string) =>
  wiki.categories.find((c: BaseCategory) => c.id === id)
