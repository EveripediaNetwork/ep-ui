import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './static/assets/global.css'
import './static/assets/dark-mode.css'
import './static/assets/markdown.css'
import '@/editor-plugins/wikiLink/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import { Provider as ReduxProvider } from 'react-redux'
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
import chakraTheme from '../theme'

type EpAppProps = AppProps & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const App = (props: EpAppProps) => {
  const { Component, pageProps, router } = props

  const provider = () =>
    new ethers.providers.AlchemyProvider(
      config.alchemyChain,
      config.alchemyApiKey,
    )

  return (
    <>
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Fonts />
          <Provider
            autoConnect
            connectors={connectors}
            provider={provider as any}
          >
            <Layout noFooter={Component.noFooter}>
              <ImageProvider>
                <Component {...pageProps} />
              </ImageProvider>
            </Layout>
          </Provider>
        </ChakraProvider>
      </ReduxProvider>
    </>
  )
}

export const getServerSideProps = config.isDeployingOnVercel
  ? async () => {
      store.dispatch(getCategoriesLinks.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
  : null

export default App
