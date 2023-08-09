import React, { StrictMode, useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import '../styles/editor-dark.css'
import '@/editor-plugins/pluginStyles.css'
import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Spinner,
  createStandaloneToast,
} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import Layout from '@/components/Layout/Layout/Layout'
import SEOHeader from '@/components/SEO/Default'
import { store } from '@/store/store'
import NextNProgress from 'nextjs-progressbar'
import { pageView } from '@/utils/googleAnalytics'
import '../utils/i18n'
import { WagmiConfig, createConfig } from 'wagmi'
import { Montserrat } from '@next/font/google'
import chakraTheme from '../theme'
import { connectors, publicClient, webSocketPublicClient } from '@/config/wagmi'
import { cookieStorageManagerSSR } from '@chakra-ui/react'
import { cookies } from 'next/headers'

const { ToastContainer } = createStandaloneToast()

type EpAppProps = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { noFooter?: boolean }
}

const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

const App = ({ Component, pageProps, router }: EpAppProps) => {
  const [hasMounted, setHasMounted] = useState(false)
  const isInitialRender = useRef(true)

  if (isInitialRender.current) {
    isInitialRender.current = false
  }

  useEffect(() => {
    const handleRouteChange = (url: URL) => pageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // if (!hasMounted) {
  //   return (
  //     <ChakraProvider resetCSS theme={chakraTheme}>
  //       <Box
  //         bgColor="#1A202C"
  //         minH={'100vh'}
  //         bgImage="/images/backgrounds/homepage-bg-dark.png"
  //       >
  //         <Center w={'100%'} h={'100vh'}>
  //           <Spinner
  //             thickness="4px"
  //             speed="0.65s"
  //             emptyColor="gray.200"
  //             color="#FF5CAA"
  //             size="xl"
  //           />
  //         </Center>
  //       </Box>
  //     </ChakraProvider>
  //   )
  // }

  return (
    <StrictMode>
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
        }
      `}</style>
      <NextNProgress color="#FF5CAA" />
      <SEOHeader router={router} />
      <ReduxProvider store={store}>
        <ChakraProvider
          // colorModeManager={colorModeManager}
          resetCSS
          theme={chakraTheme}
        >
          <WagmiConfig config={client}>
            <Layout hasMounted={hasMounted} noFooter={Component.noFooter}>
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
