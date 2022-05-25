import { MagicConnector } from '@everipedia/wagmi-magic-connector'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { chain, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import config from './index'
import { AlchemyProvider, Network } from '@ethersproject/providers'

type Connector =
  | InjectedConnector
  | MetaMaskConnector
  | WalletConnectConnector
  | CoinbaseWalletConnector
  | MagicConnector

export const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
    infuraProvider({ infuraId: config.infuraId, weight: 2 }),
    publicProvider({ weight: 3 }),
  ],
)

const network: Network = {
  name: config.alchemyChain,
  chainId: Number(config.chainId),
}

export const connectors: Connector[] = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Everipedia',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
  new MagicConnector({
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
