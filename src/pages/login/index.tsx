import React, { useEffect } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const Login = () => {
  const { data } = useAccount()
  const router = useRouter()
  useEffect(() => {
    if (data?.address) {
      if (router.query.from) {
        router.push(`${router.query.from}`)
      } else {
        router.push('/')
      }
    }
  }, [data?.address, router])

  return (
    <Container centerContent mt="8" mb="24">
      <Box w="xl">
        <Heading mb={4} fontWeight="extrabold" fontSize={23}>
          Connect your wallet
        </Heading>
        <Connectors />
      </Box>
    </Container>
  )
}

export default Login
