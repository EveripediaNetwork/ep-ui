import { createConfig, configureChains } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import config from '@/config'
import { magicConnector } from '@/lib/magic/connectors/magicConnector'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { defineChain } from 'viem'

export const iqTestnet = defineChain({
  id: 313377,
  name: 'IQ Testnet',
  network: 'IQ Testnet',
  nativeCurrency: { name: 'IQ Token', symbol: 'IQ', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.braindao.org/'],
    },
    public: {
      http: ['https://rpc-testnet.braindao.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BrainScan',
      url: 'https://testnet.braindao.org',
    },
  },
  testnet: true,
})

export const { chains, publicClient, webSocketPublicClient } =
  config.isProduction
    ? configureChains(
        [polygon],
        [alchemyProvider({ apiKey: config.alchemyApiKey }), publicProvider()],
      )
    : configureChains(
        [iqTestnet],
        [
          jsonRpcProvider({
            rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
          }),
        ],
      )

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    magicConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})
