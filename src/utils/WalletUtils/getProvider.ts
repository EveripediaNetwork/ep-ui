import config from '@/config'
import { env } from '@/env.mjs'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const rpcs: {
  [key: string]: string
} = {
  maticmum: `https://polygon-mumbai.g.alchemy.com/v2/${config.alchemyApiKey}`,
  matic: `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`,
}

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
