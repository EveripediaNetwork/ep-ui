import { Wiki } from './Wiki'

export type Activity = {
  id: string
  wikiId: string
  type: string
  content: Wiki[]
  datetime: string
}
