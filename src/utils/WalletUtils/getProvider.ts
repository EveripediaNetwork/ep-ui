import config from '@/config'
import { rpcs } from '@/config/wagmi'
import { env } from '@/env.mjs'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet } from 'viem/chains'

export const provider: any = createPublicClient({
  chain: mainnet,
  transport: http(config.ensRPC),
})

export const maticProvider: any = createPublicClient({
  chain: mainnet,
  transport: http(
    env.NEXT_PUBLIC_IS_PRODUCTION === 'production' ? rpcs.matic : rpcs.maticmum,
  ),
})

let walletClient: any

if (typeof window !== 'undefined') {
  walletClient = createWalletClient({
    chain: mainnet,
    //@ts-ignore
    transport: custom(window.ethereum!),
  })
}

export { walletClient }
