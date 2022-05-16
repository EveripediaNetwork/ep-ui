import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  level: number
  id: string
  title: string
}[] = []

const tocSlice = createSlice({
  name: 'toc',
  initialState,
  reducers: {
    addToc(state, action) {
      return [...state, action.payload]
    },
    reset() {
      return initialState
    },
  },
})

export const { addToc } = tocSlice.actions
export default tocSlice.reducer
