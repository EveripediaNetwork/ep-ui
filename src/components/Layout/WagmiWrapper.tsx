import { connectors, publicClient, webSocketPublicClient } from '@/config/wagmi'
import { WagmiConfig, createConfig } from 'wagmi'

const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={client}>{children}</WagmiConfig>
}
