import React, { Suspense, useEffect, useState } from 'react'
import { Box, Center, Spinner, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import GoogleAnalyticsScripts from '../GoogleAnalyticsScripts'

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
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem('color-mode')
      return item ? JSON.parse(item) : ''
    } catch (error) {
      console.error(error)
      return ''
    }
  })

  useEffect(() => {
    setHasMounted(true)
    const storedValue = JSON.parse(
      window.localStorage.getItem('color-mode') || '',
    )
    if (storedValue !== null) {
      setStoredValue(storedValue)
    }
  }, [])

  console.log(storedValue)

  return (
    <>
      {!hasMounted ? (
        <Box
          bgColor="#1A202C"
          minH={'100vh'}
          bgImage="/images/backgrounds/homepage-bg-dark.png"
        >
          <Center w={'100%'} h={'100vh'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#FF5CAA"
              size="xl"
            />
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
