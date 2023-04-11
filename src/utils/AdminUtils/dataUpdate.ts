import { CreatedWikisCount, Editors, Wikis } from '@/types/admin'
import { shortenAccount } from '../textUtils'

export const dataUpdate = (
  p: Editors[] | undefined,
  ban: boolean,
  id: string,
): Editors[] | undefined => {
  return p?.map((user) => {
    if (user.id === id) {
      return { ...user, active: ban }
    }
    return user
  })
}

export const userNameData = (item: Editors) => {
  return item.username || item.profile?.username || 'Unknown'
}

export const getWikiIdUsingLevel = (
  level: number,
  promotedWikis: CreatedWikisCount[] | undefined,
) => {
  const wiki = promotedWikis?.filter((item) => {
    return item.promoted === level
  })[0]

  return wiki?.id
}

/* eslint-disable no-nested-ternary */
export const accountUsername = (Data: CreatedWikisCount | Wikis) => {
  const username = Data.author?.profile?.username
    ? Data.author.profile.username
    : Data.author?.id
    ? shortenAccount(Data.author.id)
    : 'Unknown'
  return username
}
