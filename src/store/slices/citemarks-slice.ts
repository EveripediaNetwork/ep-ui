import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  [key: string]: number
} = {}

const citeMarksSlice = createSlice({
  name: 'citeMarks',
  initialState,
  reducers: {
    incCiteCount(state, action) {
      const newState = {
        ...state,
        ...{
          [action.payload]: state[action.payload]
            ? state[action.payload] + 1
            : 1,
        },
      }
      return newState
    },
    reset() {
      return initialState
    },
  },
})

export const { incCiteCount } = citeMarksSlice.actions
export default citeMarksSlice.reducer
