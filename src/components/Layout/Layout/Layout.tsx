import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { useAccount } from 'wagmi'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  ssr: false,
}) as () => JSX.Element

const Navbar = dynamic(() => import('@/components/Layout/Navbar/Navbar'))

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  const { address: userAddress } = useAccount()
  return (
    <>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-config" strategy="lazyOnload" defer>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          user_id: '${userAddress}',
          page_path: window.location.pathname,
          send_page_view: false
          });
        `}
      </Script>
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
