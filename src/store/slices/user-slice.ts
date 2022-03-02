import { AccountDataType } from '@/types/AccountDataType'
import {
  TokenDetailsType,
  ConvertedBalanceType,
} from '@/types/WalletBalanceType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: AccountDataType | null
  walletDetails: ConvertedBalanceType[] | null
  totalBalance: number | null | undefined
  balanceBreakdown: TokenDetailsType[] | null
}

const initialState: UserState = {
  user: null,
  walletDetails: null,
  totalBalance: null,
  balanceBreakdown: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<AccountDataType>) => {
      state.user = action.payload
    },
    updateWalletDetails: (
      state,
      action: PayloadAction<ConvertedBalanceType[] | null>,
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
    setStateToDefault: () => initialState,
  },
})

export const {
  updateUserDetails,
  updateWalletDetails,
  updateTotalBalance,
  updateBalanceBreakdown,
  setStateToDefault,
} = userSlice.actions

export default userSlice.reducer
