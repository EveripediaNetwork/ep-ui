import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { configureChains, Connector } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MagicAuthConnector } from '@magiclabs/wagmi-connector'
import config from './index'

const chainArray = config.alchemyChain === 'matic' ? polygon : polygonMumbai

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chainArray],
  [
    alchemyProvider({ apiKey: config.alchemyApiKey }),
    infuraProvider({ apiKey: config.infuraId }),
    publicProvider(),
  ],
)

export const rpcs: {
  [key: string]: string
} = {
  maticmum: `https://polygon-mumbai.g.alchemy.com/v2/${config.alchemyApiKey}`,
  matic: `https://polygon-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}`,
}

export const connectors = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: config.walletConnectProjectId,
    },
  }),
  new MagicAuthConnector({
    chains,
    options: {
      apiKey: config.magicLinkApiKey,
      oauthOptions: {
        providers: ['google', 'discord', 'facebook', 'twitter'],
      },
      customLogo: '/images/logos/braindao-logo.svg',
      accentColor: '#ea3b87',
      magicSdkConfiguration: {
        network: {
          rpcUrl: rpcs[config.alchemyChain],
          chainId: Number(config.chainId),
        },
      },
    },
  }) as unknown as Connector,
]
