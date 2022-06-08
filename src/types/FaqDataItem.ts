import { IconType } from 'react-icons'

type FaqDataItemData = {
  header: string
  body: string
}

export type FaqDataItem = {
  keyWord: string
  icon: IconType
  data: FaqDataItemData[]
}
