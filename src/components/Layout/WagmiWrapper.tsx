import { wagmiClient } from '@/config/wagmi'
import { WagmiConfig } from 'wagmi'

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={wagmiClient}>{children}</WagmiConfig>
}
