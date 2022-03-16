import { ProviderDataType } from '@/types/ProviderDataType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProviderState {
  detectedProvider: ProviderDataType | null
}

const initialState: ProviderState = {
  detectedProvider: null,
}

const providerSlice = createSlice({
  name: 'providerNetwork',
  initialState,
  reducers: {
    updateNetworkProvider: (
      state,
      action: PayloadAction<ProviderDataType | null>,
    ) => {
      state.detectedProvider = action.payload
    },
  },
})

export const { updateNetworkProvider } = providerSlice.actions

export default providerSlice.reducer
