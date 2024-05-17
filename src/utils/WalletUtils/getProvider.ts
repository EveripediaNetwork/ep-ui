import config from '@/config'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { iqChain } from '@/config/wagmi'

const chain = config.isProduction ? mainnet : iqChain
const transport = config.isProduction ? http(config.ensRPC) : http()

export const provider: any = createPublicClient({
  chain,
  transport,
})
