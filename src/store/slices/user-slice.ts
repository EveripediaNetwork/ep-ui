import {
  HiIQDetailsType,
  TokenDetailsType,
  WalletBalanceType,
} from '@/types/WalletBalanceType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  walletDetails: WalletBalanceType[] | null
  totalBalance: number | null | undefined
  balanceBreakdown: TokenDetailsType[] | null
  hiiq: HiIQDetailsType | null | undefined
}

const initialState: UserState = {
  walletDetails: null,
  totalBalance: null,
  balanceBreakdown: null,
  hiiq: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
} = userSlice.actions

export default userSlice.reducer
