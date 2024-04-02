import React, { Suspense } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import GoogleAnalyticsScripts from '../GoogleAnalyticsScripts'
import { ErrorBoundary } from 'react-error-boundary'

import { WagmiWrapper } from '../WagmiWrapper'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  suspense: true,
})

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  return (
    <ErrorBoundary fallback={<p>error</p>}>
      <GoogleAnalyticsScripts />
      <Stack justify="space-between" minH="100vh" spacing={0}>
        <WagmiWrapper>
          <Navbar />
        </WagmiWrapper>
        <Box as="main" pt={'70px'}>
          {children}
        </Box>
        <Suspense>{!noFooter && <Footer />}</Suspense>
      </Stack>
    </ErrorBoundary>
  )
}

export default Layout
