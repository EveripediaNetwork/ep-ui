import { MagicLinkConnector } from '@/utils/magicLinkConnector'
import { MagicSDKAdditionalConfiguration } from 'magic-sdk'
import { chain, defaultChains, InjectedConnector } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import config from './index'

const chains = defaultChains

type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector

const connectors = ({ chainId }: { chainId?: number }): Connector[] => {
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
    new MagicLinkConnector({
      chains,
      options: {
        apiKey: config.magicLinkApiKey,
        opt: {
          networkId: chainId ?? 0,
        } as MagicSDKAdditionalConfiguration,
      },
    }) as any, // TODO: fix this
  ]
}

export default connectors
