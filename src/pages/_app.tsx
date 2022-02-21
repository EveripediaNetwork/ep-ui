import React from 'react'
import '@fontsource/poppins'
// import '@fontsource/poppins/100.css'
// import '@fontsource/poppins/200.css'
// import '@fontsource/poppins/300.css'
// import '@fontsource/poppins/400.css'
// import '@fontsource/poppins/500.css'
// import '@fontsource/poppins/600.css'
// import '@fontsource/poppins/700.css'
// import '@fontsource/poppins/800.css'
// import '@fontsource/poppins/900.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import connectors from '@/config/connectors'
import Layout from '@/components/Layout/Layout/Layout'
import wrapper from '@/store/store'
import SEOHeader from '@/components/SEO/Headers'
import chakraTheme from '../theme'

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props

  return (
    <>
      <SEOHeader router={router} />
      <ChakraProvider resetCSS theme={chakraTheme}>
        <Provider autoConnect connectors={connectors}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </>
  )
}

export default wrapper.withRedux(App)
