import { LeaderBoardType } from "@/services/editor"

export const sortLeaderboards = (editors: LeaderBoardType[]) => {
    const arrayForSort = [...editors]
  const sortedleaderboards = arrayForSort.sort(
    (firstEditor: LeaderBoardType, nextEditor: LeaderBoardType) => {
      return nextEditor.totalRewards - firstEditor.totalRewards
    },
  )
  return sortedleaderboards
}

export const getEditorRank = (address: string, leaderboard: LeaderBoardType[]) => {
    return leaderboard.findIndex( editor => editor.id === address)
}