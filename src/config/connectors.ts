import { MagicConnector } from '@everipedia/wagmi-magic-connector'
import { chain, defaultChains, InjectedConnector } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import config from './index'

const chains = defaultChains

type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector
  | MagicConnector

const connectors = ({ chainId = 1 }: { chainId?: number }): Connector[] => {
  const { infuraId } = config

  const rpcUrl =
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]

  return [
    new InjectedConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Everipedia',
        jsonRpcUrl: `${rpcUrl}`,
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
          network: { rpcUrl, chainId },
        },
      },
    }),
  ]
}

export default connectors
