import { EditorsTable } from '@/types/admin'

export const dataUpdate = (
  p: EditorsTable[] | undefined,
  ban: boolean,
  id: string,
): EditorsTable[] | undefined => {
  return p?.map(user => {
    if (user.editorAddress === id) {
      return { ...user, active: ban }
    }
    return user
  })
}
