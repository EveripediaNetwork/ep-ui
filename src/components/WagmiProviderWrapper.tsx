import { createClient, WagmiConfig } from 'wagmi'
import { provider, connectors } from '@/config/wagmi'
import React, { ReactNode } from 'react'

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default WagmiProvider
