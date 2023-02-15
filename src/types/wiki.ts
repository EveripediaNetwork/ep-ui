import { ProfileData } from '@everipedia/iq-utils'

export type CommonUser = {
  id: string
  profile?: Pick<ProfileData, 'username' | 'avatar'>
}

export type CommonWikiFields =
  | 'id'
  | 'title'
  | 'summary'
  | 'created'
  | 'updated'
