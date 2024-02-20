import { useState, useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  lightTheme,
  darkTheme,
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { env } from '@/env.mjs'
import { rainbowMagicConnector } from '@/lib/MagicConnector'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    // @ts-ignore
    wallets: [rainbowMagicConnector({ chains })],
  },
  ...getDefaultWallets({
    chains,
    appName: 'My RainbowKit App',
    projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PUBLIC_ID,
  }).wallets,
])

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const lightModeStyle = {
  ...lightTheme({
    borderRadius: 'small',
    fontStack: 'system',
    overlayBlur: 'small',
  }),
  colors: {
    ...lightTheme().colors,
    connectButtonInnerBackground: 'transparent',
    accentColor: '#ea3b87',
    accentColorForeground: 'white',
  },
  shadows: {
    ...lightTheme().shadows,
    connectButton: '0px 0px 0px 1px #CBD5E059',
  },
}

const darkModeStyle = {
  ...darkTheme({
    borderRadius: 'small',
    fontStack: 'system',
    overlayBlur: 'small',
  }),
  colors: {
    ...darkTheme().colors,
    modalBackground: '#1A202C',
    accentColor: '#FF1A88',
    accentColorForeground: 'white',
    connectButtonBackground: '#2D3748',
    connectButtonInnerBackground: 'transparent',
  },
  shadows: {
    ...darkTheme().shadows,
    connectButton: '0px 0px 0px 1px #FFFFFF29',
  },
}

export const RainbowConfigWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const isDark = html.classList.contains('dark')
    if (isDark) setIsDarkTheme(true)
  }, [])

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider
        theme={isDarkTheme ? darkModeStyle : lightModeStyle}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
