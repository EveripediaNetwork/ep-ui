import { MagicConnector } from '@everipedia/wagmi-magic-connector'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { AlchemyProvider, Network } from '@ethersproject/providers'
import config from './index'

const chainArray =
  config.alchemyChain === 'matic' ? [chain.polygon] : [chain.polygonMumbai]

export const { chains, provider } = configureChains(chainArray, [
  alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
  infuraProvider({ infuraId: config.infuraId, weight: 2 }),
  publicProvider({ weight: 3 }),
])

const network: Network = {
  name: config.alchemyChain,
  chainId: Number(config.chainId),
}

export const connectors = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: false } }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
  new MagicConnector({
    chains,
    options: {
      apiKey: config.magicLinkApiKey,
      oauthOptions: {
        providers: ['google', 'discord', 'facebook', 'twitter'],
      },
      customLogo: '/images/braindao-logo.svg',
      accentColor: '#ea3b87',
      additionalMagicOptions: {
        network: {
          rpcUrl: AlchemyProvider.getUrl(network, config.alchemyApiKey).url,
          chainId: Number(config.chainId),
        },
      },
    },
  }),
]
