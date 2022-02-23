import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'

const Login = () =>
    <Container centerContent mt="8" mb="24">
      <Box w="xl">
        <Heading fontWeight="extrabold" fontSize={23}>
          Connect your wallet
        </Heading>
        <Connectors />
      </Box>
    </Container>

export default Login
