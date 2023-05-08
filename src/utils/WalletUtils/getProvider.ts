import config from '@/config'
import { createPublicClient, http, PublicClient } from 'viem'
import { mainnet } from 'viem/chains'

export const provider: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(config.ensRPC),
})
