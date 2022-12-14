import { Wiki } from '@everipedia/iq-utils'

export type Activity = {
  id: string
  wikiId: string
  type: string
  content: Wiki[]
  datetime: string
  ipfs?: string
}
