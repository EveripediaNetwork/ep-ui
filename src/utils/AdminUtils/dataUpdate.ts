import { Editors } from '@/types/admin'

export const dataUpdate = (
  p: Editors[] | undefined,
  ban: boolean,
  id: string,
): Editors[] | undefined => {
  return p?.map(user => {
    if (user.id === id) {
      return { ...user, active: ban }
    }
    return user
  })
}

export const userNameData = (item: Editors) => {
  return item.username || item.profile?.username || 'Unknown'
}
