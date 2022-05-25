import React, { StrictMode, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './static/assets/global.css'
import './static/assets/dark-mode.css'
import './static/assets/markdown.css'
import '@/editor-plugins/wikiLink/styles.css'
import '@/editor-plugins/cite/styles.css'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProviderClass } from 'react-redux'
import { createClient, WagmiConfig } from 'wagmi'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Headers'
import { store } from '@/store/store'
import { getCategoriesLinks } from '@/services/categories'
import { getRunningOperationPromises } from '@/services/wikis'
import Fonts from '@/theme/Fonts'
import { ImageProvider } from '@/context/image.context'
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

type CreateClientArgs = NonNullable<Parameters<typeof createClient>[number]>
type CreateClientConnectors = CreateClientArgs['connectors']
const createClientConnectors = connectors as CreateClientConnectors

const client = createClient({
  autoConnect: true,
  connectors: createClientConnectors,
  provider,
})

const App = (props: EpAppProps) => {
  const { Component, pageProps, router } = props

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <StrictMode>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Fonts />
          <WagmiConfig client={client}>
            <Layout noFooter={Component.noFooter}>
              <ImageProvider>
                <Component {...pageProps} />
              </ImageProvider>
            </Layout>
          </WagmiConfig>
        </ChakraProvider>
      </ReduxProvider>
      <ToastContainer />
    </StrictMode>
  )
}

export const getServerSideProps = async () => {
  store.dispatch(getCategoriesLinks.initiate())
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default App
