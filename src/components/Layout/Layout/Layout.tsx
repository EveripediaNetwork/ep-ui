import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Navbar from '@/components/Layout/Navbar/Navbar'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  ssr: false,
})

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => (
  <Stack justify="space-between" minH="100vh" spacing={0}>
    <Navbar />
    <Box as="main" pt={20}>
      {children}
    </Box>
    {!noFooter && <Footer />}
  </Stack>
)

export default Layout
