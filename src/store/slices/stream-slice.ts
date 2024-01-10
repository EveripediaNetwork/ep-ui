import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isError: false,
  currentTool: null,
}
const streamSlice = createSlice({
  name: 'chatStream',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsError(state, action) {
      state.isError = action.payload
    },
  },
})

export const { setIsLoading, setIsError } = streamSlice.actions

export default streamSlice.reducer
