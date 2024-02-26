import { wagmiConfig } from '@/config/wagmi'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const WagmiWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>{' '}
    </WagmiProvider>
  )
}
