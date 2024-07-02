import { http, createConfig, fallback } from 'wagmi'
import { polygon } from 'viem/chains'
import { injected } from 'wagmi/connectors'
import { env } from '@/env.mjs'
import config from '.'
import { dedicatedWalletConnector } from '@/lib/magic/connectors/dedicatedWalletConnector'
import { defineChain } from 'viem'

export const iqTestnet = defineChain({
  id: 313_377,
  name: 'IQ Chain',
  nativeCurrency: { name: 'IQ Token', symbol: 'IQ', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.braindao.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BrainScan',
      url: 'https://testnet.braindao.org',
      apiUrl: 'https://testnet.braindao.org/api/v2/',
    },
  },
  testnet: true,
})

const chains = config.isProduction
  ? ([polygon] as const)
  : ([iqTestnet] as const)

export const wagmiConfig = createConfig({
  chains,
  multiInjectedProviderDiscovery: false,
  ssr: false,
  transports: {
    [polygon.id]: fallback([
      http(`https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`),
      http(`https://polygon-mainnet.infura.io/v3/${config.infuraId}`),
    ]),
    [iqTestnet.id]: http(),
  },
  connectors: [
    injected(),
    dedicatedWalletConnector({
      //@ts-ignore
      chains,
      options: {
        apiKey: env.NEXT_PUBLIC_MAGIC_LINK_API_KEY,
        accentColor: '#ea3b87',
        oauthOptions: {
          providers: ['google', 'facebook', 'twitter', 'discord'],
        },
        magicSdkConfiguration: {
          network: {
            rpcUrl: config.isProduction
              ? `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`
              : iqTestnet.rpcUrls.default.http[0],
            chainId: Number(config.chainId),
          },
        },
      },
    }),
  ],
})
