import { Connector } from 'wagmi'

export type AccountDataType =
  | {
      address: string
      // eslint-disable-next-line
      connector: Connector<any, any> | undefined
      ens:
        | {
            avatar: string | null | undefined
            name: string
          }
        | undefined
    }
  | undefined
