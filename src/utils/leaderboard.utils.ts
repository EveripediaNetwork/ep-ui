import { LeaderBoardType } from '@/services/editor'

export const sortLeaderboards = (editors: LeaderBoardType[] | undefined) => {
  if (editors) {
    const arrayForSort = [...editors]
    const sortedleaderboards = arrayForSort.sort(
      (firstEditor: LeaderBoardType, nextEditor: LeaderBoardType) => {
        return nextEditor.totalRewards - firstEditor.totalRewards
      },
    )
    return sortedleaderboards
  }
  return null
}

export const getEditorRank = (
  address: string,
  leaderboard: LeaderBoardType[],
) => {
  return leaderboard.findIndex(editor => editor.id === address)
}
