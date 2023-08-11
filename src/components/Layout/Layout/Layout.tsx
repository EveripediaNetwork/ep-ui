import React, { Suspense } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import GoogleAnalyticsScripts from '../GoogleAnalyticsScripts'
import { useIsMounted } from '@/hooks/useIsMounted'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  suspense: true,
})

const Layout = ({
  children,
  noFooter,
  colorMode,
}: {
  children: React.ReactNode
  noFooter?: boolean
  colorMode: string
}) => {
  const isMounted = useIsMounted()

  return (
    <>
      <GoogleAnalyticsScripts />
      {!isMounted && colorMode === 'dark' && (
        <Box
          bgColor="#1A202C"
          w={'100%'}
          h={'100%'}
          position="fixed"
          left={0}
          top={0}
          zIndex={9999}
        />
      )}
      <Stack justify="space-between" minH="100vh" spacing={0}>
        <Navbar />
        <Box as="main" pt={20}>
          {children}
        </Box>
        <Suspense>{!noFooter && <Footer />}</Suspense>
      </Stack>
    </>
  )
}

export default Layout
