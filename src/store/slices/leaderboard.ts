import { LeaderBoardType } from '@/services/editor'
import { createSlice } from '@reduxjs/toolkit'

type LeaderboardSliceType = {
  addressRank: number | null
  leaderboard: LeaderBoardType[]
}
const initialState: LeaderboardSliceType = {
  addressRank: null,
  leaderboard: [],
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboards(state, action) {
      state.leaderboard = action.payload
    },
    setAddressRank(state, action) {
      state.addressRank = action.payload
    },
  },
})

export const { setLeaderboards, setAddressRank } = leaderboardSlice.actions

export default leaderboardSlice.reducer
