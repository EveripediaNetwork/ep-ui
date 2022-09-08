import React from 'react'
import { Box, Stack } from '@chakra-ui/react'

const Footer = React.lazy(() => import('@/components/Layout/Footer/Footer'))
const Navbar = React.lazy(() => import('@/components/Layout/Navbar/Navbar'))
const GoogleAnalyticsScripts = React.lazy(
  () => import('@/components/Layout/Layout/GoogleAnalyticsScripts'),
)

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  return (
    <>
      <GoogleAnalyticsScripts />
      <Stack justify="space-between" minH="100vh" spacing={0}>
        <Navbar />
        <Box as="main" pt={20}>
          {children}
        </Box>
        {!noFooter && <Footer />}
      </Stack>
    </>
  )
}

export default Layout
