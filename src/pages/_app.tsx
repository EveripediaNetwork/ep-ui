import React, { StrictMode, useEffect } from 'react'
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
import { pageView } from '@/utils/googleAnalytics'
import { Montserrat } from '@next/font/google'
import chakraTheme from '../theme'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { ThemeProviderWrapper } from '@/components/Layout/Theme/ThemeProvider'

const { ToastContainer } = createStandaloneToast()

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

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
      <div className="" suppressHydrationWarning={true}>
        <style jsx global>{`
          :root {
            --montserrat-font: ${montserrat.style.fontFamily};
          }
        `}</style>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <NextNProgress color="#FF5CAA" />
        <SEOHeader router={router} />
        <ThemeProviderWrapper>
          <ReduxProvider store={store}>
            <ChakraProvider resetCSS theme={chakraTheme}>
              <Layout noFooter={Component.noFooter}>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </ReduxProvider>
        </ThemeProviderWrapper>
        <ToastContainer />
      </div>
    </StrictMode>
  )
}

export default appWithTranslation(App)
