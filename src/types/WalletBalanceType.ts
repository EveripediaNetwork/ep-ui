import { Connector } from 'wagmi'

export type BalanceType = {
  data?: {
    formatted: string
    symbol: string
    value: bigint
  }
  error: Error | undefined
}

export type WalletBalanceType = {
  data?: {
    formatted: string | undefined
    symbol: string | undefined
  }
}

export type ConvertedBalanceType = {
  data?: {
    formatted: string | undefined
    symbol: string | undefined
  }
  error: Error | undefined
}

export type ErrorType = {
  data: undefined
  error: Error
}

export type ParamsType = {
  addressOrName: string
  token?: string | undefined
}

export type WalletParamsType = {
  addressOrName: string | undefined
  token?: string | undefined
}

export type TokenDetailsType = {
  price: number
  token: string | undefined
} | null

export type HiIQDetailsType = {
  hiiqBalance: number
  iqPrice: number
  symbol: string
  totalUsdBalance: number
}

export type ConnectorDetailsType = {
  imageLink: string
  connector: Connector
  connect: (args: { connector: Connector }) => void
  loading?: boolean
}

export type WalletDetailsType = {
  symbol: string | undefined
  balance: string | null
  tokensArray: TokenDetailsType[]
}

export type WalletDetailsWrapperType = {
  children: JSX.Element
  connect?: (w: Connector) => void
  w?: Connector
  hasHover: boolean
}
