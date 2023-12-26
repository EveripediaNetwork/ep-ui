import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  result: null,
  isGenerating: false,
  isError: false,
  toCloseStream: false,
  currentTool: null,
}
const streamSlice = createSlice({
  name: 'chatStream',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsGenerating(state, action) {
      state.isGenerating = action.payload
    },
    setIsError(state, action) {
      state.isError = action.payload
    },
    setToCloseStream(state, action) {
      state.toCloseStream = action.payload
    },
  },
})

export const { setIsLoading, setIsGenerating, setIsError, setToCloseStream } =
  streamSlice.actions

export default streamSlice.reducer
