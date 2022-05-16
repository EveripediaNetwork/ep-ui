import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './static/assets/global.css'
import './static/assets/dark-mode.css'
import './static/assets/markdown.css'
import '@/editor-plugins/wikiLink/styles.css'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProviderClass } from 'react-redux'
import { Provider, createClient } from 'wagmi'
import { ethers } from 'ethers'
import connectors from '@/config/connectors'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Headers'
import { store } from '@/store/store'
import { getCategoriesLinks } from '@/services/categories'
import { getRunningOperationPromises } from '@/services/wikis'
import Fonts from '@/theme/Fonts'
import { ImageProvider } from '@/context/image.context'
import config from '@/config'
import NextNProgress from 'nextjs-progressbar'
import { pageView } from '@/utils/googleAnalytics'
import Script from 'next/script'
import { Dict } from '@chakra-ui/utils'
import chakraTheme from '../theme'

const { ToastContainer } = createStandaloneToast()
const ReduxProvider = ReduxProviderClass as unknown as (
  props: Dict,
) => JSX.Element

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const provider = () =>
  new ethers.providers.AlchemyProvider(
    config.alchemyChain,
    config.alchemyApiKey,
  )

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
    <>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-config" strategy="lazyOnload">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
                send_page_view: false
                });
            `}
      </Script>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Fonts />
          <Provider client={client}>
            <Layout noFooter={Component.noFooter}>
              <ImageProvider>
                <Component {...pageProps} />
              </ImageProvider>
            </Layout>
          </Provider>
        </ChakraProvider>
      </ReduxProvider>
      <ToastContainer />
    </>
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
