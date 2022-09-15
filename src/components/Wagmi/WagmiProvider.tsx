import { createClient, WagmiConfig } from 'wagmi'
import { provider, connectors } from '@/config/wagmi'
import React, { ReactNode, useMemo } from 'react'
import { useWagmiStatus } from '@/components/Wagmi/context'

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  const { isWagmiWrapped } = useWagmiStatus()
  const client = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors: isWagmiWrapped ? connectors : undefined,
        provider,
      }),
    [isWagmiWrapped],
  )
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default WagmiProvider
