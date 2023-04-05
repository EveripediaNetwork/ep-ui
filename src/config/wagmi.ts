import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { chain, configureChains, Connector } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MagicAuthConnector } from '@everipedia/wagmi-magic-connector'
import config from './index'

const chainArray =
  config.alchemyChain === 'matic' ? [chain.polygon] : [chain.polygonMumbai]

export const { chains, provider } = configureChains(chainArray, [
  alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
  infuraProvider({ infuraId: config.infuraId, weight: 2 }),
  publicProvider({ weight: 3 }),
])

const rpcs: {
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
      qrcode: true,
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
