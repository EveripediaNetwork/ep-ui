import { Editors, EditorsTable } from '@/types/admin'

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
