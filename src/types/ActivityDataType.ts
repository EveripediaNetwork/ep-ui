import {
  RecordTypeNonPrimitive,
  RecordTypePicker,
  Wiki,
} from '@everipedia/iq-utils'

export type Activity = {
  id: string
  wikiId: string
  type: string
  content: Wiki[]
  datetime: string
  ipfs?: string
}

export type ActivityBuilder<
  NonPrimitiveOverrides extends RecordTypeNonPrimitive<Activity>,
  Keys extends keyof Activity,
> = RecordTypePicker<Activity, NonPrimitiveOverrides, Keys>
