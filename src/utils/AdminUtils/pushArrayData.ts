// import { Editors, EditorsTable } from '@/types/admin'

// export const userNameData = (item: Editors, type?: string) => {
//   if (type === 'search') {
//     return item?.username ? item?.username : 'Unknown'
//   }

//   return item?.profile?.username ? item?.profile?.username : 'Unknown'
// }

// export const pushItems = (
//   parentArray: Editors[] | undefined,
//   childArray: EditorsTable[],
//   type?: string,
// ) => {
//   parentArray
//     ?.filter(item => {
//       return item?.wikisCreated
//     })
//     ?.forEach(item => {
//       childArray.push({
//         editorName: userNameData(item, type),
//         editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : '',
//         editorAddress: item?.id,
//         createdWikis: item?.wikisCreated,
//         editiedWikis: item?.wikisEdited,
//         lastCreatedWiki: item?.wikisCreated[0]
//           ? item?.wikisCreated[0]
//           : item?.wikisEdited[0],
//         latestActivity: item?.wikisCreated[0]?.datetime.split('T')[0],
//         active: item?.active,
//       })
//       return null
//     })
// }
