import React, { Suspense, useContext } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { WagmiStatusContext } from '../Wagmi/WagmiStatusContext'
import GoogleAnalyticsScripts from './GoogleAnalyticsScripts'
import Navbar from './Navbar/Navbar'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  suspense: true,
})
const DeferredNetworkErrorNotification = dynamic(
  () => import('@/components/Layout/Network/DeferredNetworkErrorNotification'),
)
const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  const { isWagmiWrapped } = useContext(WagmiStatusContext)

  return (
    <>
      <GoogleAnalyticsScripts />

      <Stack justify="space-between" minH="100vh" spacing={0}>
        <Navbar />
        <Box as="main" pt={20}>
          {children}
        </Box>
        <Suspense>{!noFooter && <Footer />}</Suspense>
      </Stack>

      {isWagmiWrapped && <DeferredNetworkErrorNotification />}
    </>
  )
}

export default Layout
