import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'

export const getKeyByValue = <T>(
  object: Record<string, T>,
  value: T,
): string | undefined =>
  Object.keys(object).find((key) => object[key] === value)

export type CategoryKey<T> = {
  [K in keyof T]: K
}[keyof T]

export type CategoryKeyType = CategoryKey<typeof CATEGORIES_WITH_INDEX>
