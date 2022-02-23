import { BigNumber } from '@ethersproject/bignumber'

export type BalanceType = {
  data?: {
    formatted: string
    symbol: string
    value: BigNumber
  }
  error: undefined
}

export type ErrorType = {
  data: undefined
  error: Error
}

export type ParamsType = {
  addressOrName: string
  token?: string | undefined
}
export type TokenDetailsType = {
  price: number
  token: string | undefined
} | null
