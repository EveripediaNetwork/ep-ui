import React, { StrictMode, useEffect, useState } from 'react'
import '../styles/global.css'
import '../styles/editor-dark.css'
import '@/editor-plugins/pluginStyles.css'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProviderClass } from 'react-redux'
import { createClient, WagmiConfig } from 'wagmi'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Default'
import { store } from '@/store/store'
import Fonts from '@/theme/Fonts'
import NextNProgress from 'nextjs-progressbar'
import { pageView } from '@/utils/googleAnalytics'
import { Dict } from '@chakra-ui/utils'
import { provider, connectors } from '@/config/wagmi'
import chakraTheme from '../theme'
import '../utils/i18n'

const { ToastContainer } = createStandaloneToast()
const ReduxProvider = ReduxProviderClass as unknown as (
  props: Dict,
) => JSX.Element

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const defaultClient = createClient({
  autoConnect: true,
  provider,
})

const App = ({ Component, pageProps, router }: EpAppProps) => {
  useEffect(() => {
    const handleRouteChange = (url: URL) => pageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const [client, setClient] = useState(defaultClient)

  useEffect(() => {
    const clientWithConnectors = createClient({
      autoConnect: true,
      connectors,
      provider,
    })
    setClient(clientWithConnectors)
  }, [])

  return (
    <StrictMode>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Fonts />
          <WagmiConfig client={client}>
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
