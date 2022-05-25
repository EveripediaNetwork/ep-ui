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

type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | CoinbaseWalletConnector
  | MagicConnector

const alchemy = alchemyProvider({
  alchemyId: config.alchemyApiKey,
  weight: 1,
})
const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    alchemy,
    infuraProvider({ infuraId: config.infuraId, weight: 2 }),
    publicProvider({ weight: 3 }),
  ],
)

const connectors: Connector[] = [
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
        network: { rpcUrl: alchemy.rpcUrl, chainId: config.chainId },
      },
    },
  }),
]

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default client
