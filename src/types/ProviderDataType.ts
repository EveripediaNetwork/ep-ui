type JsonRpcRequest = {
  method: string
  params?: {
    type: string
    options: {
      address: string
      symbol: string
      decimals: number
      image: string
    }
  }
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export type JsonRpcResponse = {
  id: string | undefined
  jsonrpc: '2.0'
  method: string
  result?: unknown
  error?: Error
}

type JsonRpcCallback = (error: Error, response: JsonRpcResponse) => unknown

type RequestParameters = {
  chainId?: string
  chainName?: string
  rpcUrls?: string[]
}

export type ProviderDataType = {
  request: (request: {
    method: string
    params?: RequestParameters[]
  }) => Promise<string>
  on: (eventType: string, handler: (chainId: string) => unknown) => void
  removeListener: (
    eventType: string,
    handler: (chainId: string) => unknown,
  ) => void
  sendAsync: (
    payload: JsonRpcRequest,
    callback: JsonRpcCallback,
  ) => Promise<unknown>
}
