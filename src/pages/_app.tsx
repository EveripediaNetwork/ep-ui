import React, { StrictMode, useEffect } from 'react'
import '../styles/global.css'
import '../styles/editor-dark.css'
import '@/editor-plugins/pluginStyles.css'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProviderClass } from 'react-redux'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Default'
import { store } from '@/store/store'
import Fonts from '@/theme/Fonts'
import NextNProgress from 'nextjs-progressbar'
import { pageView } from '@/utils/googleAnalytics'
import { Dict } from '@chakra-ui/utils'
import '../utils/i18n'
import { DynamicWagmiProvider } from '@/components/Wagmi/DynamicWagmiProvider'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import chakraTheme from '../theme'

const { ToastContainer } = createStandaloneToast()
const ReduxProvider = ReduxProviderClass as unknown as (
  props: Dict,
) => JSX.Element

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const App = ({ Component, pageProps, router }: EpAppProps) => {
  useEffect(() => {
    const handleRouteChange = (url: URL) => pageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <StrictMode>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Fonts />
          <DynamicWagmiProvider>
            <Layout noFooter={Component.noFooter}>
              <Component {...pageProps} />
            </Layout>
          </DynamicWagmiProvider>
        </ChakraProvider>
      </ReduxProvider>
      <ToastContainer />
    </StrictMode>
  )
}

export default App
