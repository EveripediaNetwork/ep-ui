import config from '@/config'
import { createPublicClient, http } from 'viem'
import { polygon } from 'viem/chains'

export const provider = createPublicClient({
    chain: polygon,
    transport: http(config.ensRPC)
  })
