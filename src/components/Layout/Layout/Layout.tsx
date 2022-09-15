import React, { Suspense } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useWagmiStatus } from '@/components/Wagmi/context'
import Navbar from '../Navbar/Navbar'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  suspense: true,
})
const NetworkErrorNotification = dynamic(
  () => import('@/components/Layout/Network/NetworkErrorNotification'),
)
const GoogleAnalyticsScripts = dynamic(
  () => import('@/components/Layout/Layout/GoogleAnalyticsScripts'),
)

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  const { isWagmiWrapped } = useWagmiStatus()

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

      {isWagmiWrapped && <NetworkErrorNotification />}
    </>
  )
}

export default Layout
