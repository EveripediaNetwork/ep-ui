import React, { StrictMode, useEffect } from 'react'
import '../styles/global.css'
import '../styles/editor-dark.css'
import '@/editor-plugins/pluginStyles.css'
import {
  ChakraProvider,
  createStandaloneToast,
  localStorageManager,
} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Default'
import { store } from '@/store/store'
import NextNProgress from 'nextjs-progressbar'
import { pageView } from '@/utils/googleAnalytics'
import '../utils/i18n'
import { WagmiConfig, createConfig } from 'wagmi'
import { Montserrat } from '@next/font/google'
import chakraTheme from '../theme'
import { connectors, publicClient, webSocketPublicClient } from '@/config/wagmi'

const { ToastContainer } = createStandaloneToast()

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

const App = ({ Component, pageProps, router }: EpAppProps) => {
  useEffect(() => {
    const handleRouteChange = (url: URL) => pageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <StrictMode>
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
        }
      `}</style>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider
          colorModeManager={localStorageManager}
          resetCSS
          theme={chakraTheme}
        >
          <WagmiConfig config={client}>
            <Layout noFooter={Component.noFooter}>
              <Component {...pageProps} />
            </Layout>
          </WagmiConfig>
        </ChakraProvider>
      </ReduxProvider>
      <ToastContainer />
    </StrictMode>
  )
}

export default App
