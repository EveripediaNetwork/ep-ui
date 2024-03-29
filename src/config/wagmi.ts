import { http, createConfig, fallback } from 'wagmi'
import { polygon, polygonMumbai } from 'viem/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { env } from '@/env.mjs'
import config from '.'
import { rpcs } from '@/utils/WalletUtils/getProvider'
import { dedicatedWalletConnector } from '@/lib/magic/connectors/dedicatedWalletConnector'

const chains =
  config.alchemyChain === 'matic'
    ? ([polygon] as const)
    : ([polygonMumbai] as const)

export const wagmiConfig = createConfig({
  chains,
  multiInjectedProviderDiscovery: false,
  transports: {
    [polygon.id]: fallback([
      http(`https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`),
      http(`https://polygon-mainnet.infura.io/v3/${config.infuraId}`),
    ]),
    [polygonMumbai.id]: fallback([
      http(`https://polygon-mumbai.g.alchemy.com/v2/${config.alchemyApiKey}`),
      http(`https://polygon-mumbai.infura.io/v3/${config.infuraId}`),
    ]),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: config.walletConnectProjectId,
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
            rpcUrl: rpcs[config.alchemyChain],
            chainId: Number(config.chainId),
          },
        },
      },
    }),
  ],
})
