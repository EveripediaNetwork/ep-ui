import { createSlice } from '@reduxjs/toolkit'
import { ENSData } from '@/types/ENSDataType'

const initialState: ENSData = {}
const ensSlice = createSlice({
  name: 'ens',
  initialState,
  reducers: {
    addENSAddress(state, action) {
      const newState = {
        ...state,
        [action.payload.address]: {
          username: action.payload.username,
          avatar: action.payload.avatar,
        },
      }
      return newState
    },
  },
})

export const { addENSAddress } = ensSlice.actions
export default ensSlice.reducer
