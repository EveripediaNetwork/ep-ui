import { createConfig, http } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'
import { DedicatedWalletConnector } from '@magiclabs/wagmi-connector'
import config from '.'
import { createConnector } from '@wagmi/core'

export type InjectedParameters = {}

export const rpcs: {
  [key: string]: string
} = {
  maticmum: `https://polygon-mumbai.g.alchemy.com/v2/${config.alchemyApiKey}`,
  matic: `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`,
}

function injected(_parameters = {}) {
  //@ts-ignore
  return createConnector((_) => {
    return new DedicatedWalletConnector({
      options: {
        apiKey: config.magicLinkApiKey,
        oauthOptions: {
          providers: ['google', 'discord', 'facebook', 'twitter'],
        },
        customLogo: '/images/logos/braindao-logo.svg',
        accentColor: '#ea3b87',
        magicSdkConfiguration: {
          network: {
            rpcUrl: rpcs[config.alchemyChain], // Assuming rpcs is a property of config
            chainId: Number(config.chainId),
          },
        },
      },
    })
  })
}

export const wagmiConfig = createConfig({
  chains: [polygon, polygonMumbai],
  multiInjectedProviderDiscovery: true,
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
  connectors: [
    walletConnect({ projectId: config.walletConnectProjectId }),
    injected(),
  ],
})
