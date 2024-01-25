import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface ILoadAppDetails {
  marketcap: number
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const setAll = (state: any, properties: any) => {
  const props = Object.keys(properties)
  props.forEach((key) => {
    state[key] = properties[key]
  })
}

export const loadAppDetails = createAsyncThunk(
  'app/loadAppDetails',
  async ({ marketcap }: ILoadAppDetails) => ({
    loading: false,
    marketPrice: marketcap,
  }),
)
export interface IAppSlice {
  loading: boolean
  marketPrice: number
  isDrawerOpen: boolean
  language: 'en' | 'ko'
}

const initialState: IAppSlice = {
  loading: true,
  marketPrice: 0,
  isDrawerOpen: false,
  language: 'en',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload)
    },
    setDrawerOpen(state, action) {
      state.isDrawerOpen = action.payload
    },
    setLanguage(state, action) {
      state.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload)
        state.loading = false
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false
        // eslint-disable-next-line no-console
        console.error(error)
      })
  },
})

export default appSlice.reducer

export const { fetchAppSuccess, setDrawerOpen, setLanguage } = appSlice.actions
