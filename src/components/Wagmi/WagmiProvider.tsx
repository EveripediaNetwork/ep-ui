import { createConfig, WagmiConfig } from 'wagmi'
import { publicClient, connectors, webSocketPublicClient } from '@/config/wagmi'
import React, { ReactNode } from 'react'

const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig config={client}>{children}</WagmiConfig>
}

export default WagmiProvider
