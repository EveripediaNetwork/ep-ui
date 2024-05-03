import { http, createConfig, fallback } from 'wagmi'
import { polygon } from 'viem/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { env } from '@/env.mjs'
import config from '.'
import { dedicatedWalletConnector } from '@/lib/magic/connectors/dedicatedWalletConnector'
import { defineChain } from 'viem'

const iqChain = defineChain({
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

const chains = JSON.parse(config.isProduction)
  ? ([polygon] as const)
  : ([iqChain] as const)

export const wagmiConfig = createConfig({
  chains,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [polygon.id]: fallback([
      http(`https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`),
      http(`https://polygon-mainnet.infura.io/v3/${config.infuraId}`),
    ]),
    [iqChain.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: config.walletConnectProjectId,
      relayUrl: 'wss://relay.walletconnect.org',
    }),
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
            rpcUrl: JSON.parse(config.isProduction)
              ? `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`
              : iqChain.rpcUrls.default.http[0],
            chainId: Number(config.chainId),
          },
        },
      },
    }),
  ],
})
