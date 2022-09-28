import React, { ReactNode, useContext, useEffect, useState } from 'react'
import config from '@/config'
import { WagmiStatusContext } from './WagmiStatusContext'

const DeferredWagmiProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<any>({})
  const [WagmiConfiguration, setWagmiConfiguration] = useState<any>({})
  const [initFinished, setInitFinished] = useState(false)
  const { isWagmiWrapped } = useContext(WagmiStatusContext)

  useEffect(() => {
    const init = async () => {
      const { createClient, chain, configureChains, WagmiConfig } =
        await import('wagmi')
      const { AlchemyProvider } = await import('@ethersproject/providers')
      const { WalletConnectConnector } = await import(
        'wagmi/connectors/walletConnect'
      )
      const { MetaMaskConnector } = await import('wagmi/connectors/metaMask')
      const { MagicConnector } = await import(
        '@everipedia/wagmi-magic-connector'
      )
      const { alchemyProvider } = await import('wagmi/providers/alchemy')
      const { infuraProvider } = await import('wagmi/providers/infura')
      const { publicProvider } = await import('wagmi/providers/public')

      const chainArray =
        config.alchemyChain === 'matic'
          ? [chain.polygon]
          : [chain.polygonMumbai]

      const { chains, provider } = configureChains(chainArray, [
        alchemyProvider({ alchemyId: config.alchemyApiKey, weight: 1 }),
        infuraProvider({ infuraId: config.infuraId, weight: 2 }),
        publicProvider({ weight: 3 }),
      ])

      const connectors = [
        new MetaMaskConnector({
          chains,
          options: { shimDisconnect: true },
        }),
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
                rpcUrl: AlchemyProvider.getUrl(
                  {
                    name: config.alchemyChain,
                    chainId: Number(config.chainId),
                  },
                  config.alchemyApiKey,
                ).url,
                chainId: Number(config.chainId),
              },
            },
          },
        }),
      ]

      const newClient = createClient({
        autoConnect: true,
        connectors,
        provider,
      })

      setClient({ newClient })
      setWagmiConfiguration({ WagmiConfig })
      setInitFinished(true)
    }
    if (isWagmiWrapped && !initFinished) init()
  }, [initFinished, isWagmiWrapped])

  return (
    WagmiConfiguration.WagmiConfig &&
    client.newClient && (
      <WagmiConfiguration.WagmiConfig client={client.newClient}>
        {children}
      </WagmiConfiguration.WagmiConfig>
    )
  )
}

export default DeferredWagmiProvider
