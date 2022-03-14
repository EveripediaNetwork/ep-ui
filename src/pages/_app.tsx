import React from 'react'
import '@fontsource/poppins'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './static/assets/global.css'
import './static/assets/dark-mode.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import { Provider as ReduxProvider } from 'react-redux'
import { debounce } from 'debounce'

import connectors from '@/config/connectors'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Headers'
import { saveState } from '@/utils/browserStorage'
import { store } from '@/store/store'
import { getCategoriesLinks } from '@/services/categories'
import { getRunningOperationPromises } from '@/services/wikis'
import chakraTheme from '../theme'

type EpAppProps = AppProps & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}
const App = (props: EpAppProps) => {
  const { Component, pageProps, router } = props

  store.subscribe(
    debounce(() => {
      saveState(store.getState())
    }, 400),
  )

  return (
    <>
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <Provider autoConnect connectors={connectors}>
            <Layout noFooter={Component.noFooter}>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ChakraProvider>
      </ReduxProvider>
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
