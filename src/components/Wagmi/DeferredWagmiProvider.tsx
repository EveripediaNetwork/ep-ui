import { createClient, WagmiConfig, chain, configureChains } from 'wagmi'
import React, { ReactNode } from 'react'
import { MagicConnector } from '@everipedia/wagmi-magic-connector'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { AlchemyProvider, Network } from '@ethersproject/providers'
import config from '@/config'

const DeferredWagmiProvider = ({ children }: { children: ReactNode }) => {
  const chainArray =
    config.alchemyChain === 'matic' ? [chain.polygon] : [chain.polygonMumbai]

  const { chains, provider } = configureChains(chainArray, [
    alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
    infuraProvider({ infuraId: config.infuraId, weight: 2 }),
    publicProvider({ weight: 3 }),
  ])

  const network: Network = {
    name: config.alchemyChain,
    chainId: Number(config.chainId),
  }

  const connectors = [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
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
  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default DeferredWagmiProvider
