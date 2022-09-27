import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { WagmiStatusContext } from '@/components/Wagmi/DynamicWagmiProvider'
import dynamic from 'next/dynamic'
import { wagmiNeededRoute } from '@/components/WrapperRoutes/WagmiNeededRoute'

const DeferredConnectors = dynamic(
  () => import('@/components/Layout/WalletDrawer/DeferredConnectors'),
  {
    ssr: false,
  },
)

const Login = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { setIsWagmiWrapped } = useContext(WagmiStatusContext)

  useEffect(() => {
    setIsWagmiWrapped(true)
  }, [setIsWagmiWrapped])

  const { address: userAddress } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (userAddress) {
      if (router.query.from) {
        router.push(`${router.query.from}`)
      } else {
        router.push('/')
      }
    }
  }, [userAddress, router])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <Container centerContent mt="8" mb="24">
      <Box minW="min(90%, 300px)">
        <Heading mb={4} fontSize={23}>
          Connect your wallet
        </Heading>
        <DeferredConnectors />
      </Box>
    </Container>
  )
}

export default dynamic(() => Promise.resolve(wagmiNeededRoute(Login)), {
  ssr: false,
})
