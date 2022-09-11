import {
  HiIQDetailsType,
  TokenDetailsType,
  WalletBalanceType,
} from '@/types/WalletBalanceType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  address: string | null
  walletDetails: WalletBalanceType[] | null
  totalBalance: number | null | undefined
  balanceBreakdown: TokenDetailsType[] | null
  hiiq: HiIQDetailsType | null | undefined
}

const initialState: UserState = {
  address: null,
  walletDetails: null,
  totalBalance: null,
  balanceBreakdown: null,
  hiiq: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
    },
    updateWalletDetails: (
      state,
      action: PayloadAction<WalletBalanceType[] | null>,
    ) => {
      state.walletDetails = action.payload
    },
    updateTotalBalance: (
      state,
      action: PayloadAction<number | null | undefined>,
    ) => {
      state.totalBalance = action.payload
    },
    updateBalanceBreakdown: (
      state,
      action: PayloadAction<TokenDetailsType[] | null>,
    ) => {
      state.balanceBreakdown = action.payload
    },
    updateHiIQDetails: (
      state,
      action: PayloadAction<HiIQDetailsType | null>,
    ) => {
      state.hiiq = action.payload
    },
    setStateToDefault: () => initialState,
  },
})

export const {
  updateWalletDetails,
  updateTotalBalance,
  updateBalanceBreakdown,
  updateHiIQDetails,
  setStateToDefault,
  updateUserAddress,
} = userSlice.actions

export default userSlice.reducer
