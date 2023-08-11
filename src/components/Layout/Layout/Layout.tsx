import React, { Suspense, useEffect, useState } from 'react'
import {
  Box,
  Center,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import GoogleAnalyticsScripts from '../GoogleAnalyticsScripts'
import { Logo } from '@/components/Elements'

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
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  // const storedCookieValue = getCookie('color-mode') as String

  return (
    <>
      {true ? (
        <Box
          bgColor="#1A202C"
          minH={'100vh'}
          // bgImage="/images/backgrounds/homepage-bg-dark.png"
        >
          <Center w={'100%'} h={'100vh'}>
            <VStack gap={'3rem'}>
              <HStack>
                <Logo w={'70px'} h={'70px'} />
                <Text fontWeight="bold" fontSize="4xl" color="white">
                  IQ.wiki
                </Text>
              </HStack>

              <span className="loader" />
            </VStack>
          </Center>
        </Box>
      ) : (
        <>
          <GoogleAnalyticsScripts />

          <Stack justify="space-between" minH="100vh" spacing={0}>
            <Navbar />
            <Box as="main" pt={20}>
              {children}
            </Box>
            <Suspense>{!noFooter && <Footer />}</Suspense>
          </Stack>
        </>
      )}
    </>
  )
}

export default Layout
