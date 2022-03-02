import React from 'react'
import '@fontsource/poppins'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import { Provider as ReduxProvider } from 'react-redux'
import connectors from '@/config/connectors'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Headers'
import { debounce } from 'debounce'
import { saveState } from '@/utils/browserStorage'
import { store } from '@/store/store'
import chakraTheme from '../theme'
import './static/assets/dark-mode.css'

const App = (props: AppProps) => {
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
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ChakraProvider>
      </ReduxProvider>
    </>
  )
}

export default App
