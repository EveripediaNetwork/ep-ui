import React, { StrictMode } from 'react'
import '../styles/global.css'
import '../styles/editor-dark.css'
import '@/editor-plugins/pluginStyles.css'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Default'
import { store } from '@/store/store'
import NextNProgress from 'nextjs-progressbar'
import { Montserrat, Moo_Lah_Lah } from '@next/font/google'
import chakraTheme from '../theme'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { WagmiWrapper } from '@/components/Layout/WagmiWrapper'
import { CSPostHogProvider } from '@/components/Layout/CSPostHogProvider'

const { ToastContainer } = createStandaloneToast()

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const mooLahLah = Moo_Lah_Lah({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const App = ({ Component, pageProps, router }: EpAppProps) => {
  return (
    <StrictMode>
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
          --moo-lah-lah-font: ${mooLahLah.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <WagmiWrapper>
            <CSPostHogProvider>
              <Layout noFooter={Component.noFooter}>
                <Component {...pageProps} />
              </Layout>
            </CSPostHogProvider>
          </WagmiWrapper>
        </ChakraProvider>
      </ReduxProvider>
      <ToastContainer />
    </StrictMode>
  )
}

export default appWithTranslation(App)
