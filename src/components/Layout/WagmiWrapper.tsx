import { wagmiConfig } from '@/config/wagmi'
import { WagmiConfig } from 'wagmi'

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
