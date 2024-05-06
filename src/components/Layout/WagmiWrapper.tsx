import { wagmiConfig, createWikiConfig } from '@/config/wagmi'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const createWagmiWrapper = (ssr: boolean) => {
  const config = ssr ? wagmiConfig : createWikiConfig

  const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    )
  }

  return WagmiWrapper
}
