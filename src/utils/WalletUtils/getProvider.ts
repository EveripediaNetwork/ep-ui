import config from '@/config'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { iqTestnet } from '@/config/wagmi'

const chain = config.isProduction ? mainnet : iqTestnet
const transport = config.isProduction ? http(config.ensRPC) : http()

export const provider: any = createPublicClient({
  chain,
  transport,
})
