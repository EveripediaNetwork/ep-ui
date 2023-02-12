import { Editors } from '@/types/admin'

export interface EditorsTable {
  editorName: string
  createdWikis: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: { title: string; images: { id: string } }
  }[]
  editiedWikis: {
    content: {
      title: string
      images: {
        id: string
      }
    }
    datetime: string
    id: string
    ipfs: string
    wikiId: string
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastCreatedWiki: any
  editorAvatar: string
  latestActivity: string
  editorAddress: string
  active: boolean
}

export const pushItems = (
  parentArray: Editors[] | undefined,
  childArray: EditorsTable[],
) => {
  parentArray
    ?.filter(item => {
      return item?.wikisCreated?.length > 0 || item?.wikisEdited.length > 0
    })
    ?.forEach(item => {
      childArray.push({
        editorName: item?.profile?.username
          ? item?.profile?.username
          : 'Unknown',
        editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : '',
        editorAddress: item?.id,
        createdWikis: item?.wikisCreated,
        editiedWikis: item?.wikisEdited,
        lastCreatedWiki: item?.wikisCreated[0]
          ? item?.wikisCreated[0]
          : item?.wikisEdited[0],
        latestActivity: item?.wikisCreated[0]?.datetime.split('T')[0],
        active: item?.active,
      })
      return null
    })
}

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
