import config from '@/config'
import { rpcs } from '@/config/wagmi'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const provider: any = createPublicClient({
  chain: mainnet,
  transport: http(config.ensRPC),
})

export const maticProvider: any = createPublicClient({
  chain: mainnet,
  transport: http(rpcs.matic),
})
