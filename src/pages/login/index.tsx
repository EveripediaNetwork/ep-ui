import React, { useEffect } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/router'

const Login = () => {
  const {user} = useSelector((state: RootState) => state.user)
  const router = useRouter()
  useEffect(()=> {
    if(user){
        router.back()
    }
  }, [user])

  return(
    <Container centerContent mt="8" mb="24">
    <Box w="xl">
      <Heading fontWeight="extrabold" fontSize={23}>
        Connect your wallet
      </Heading>
      <Connectors />
    </Box>
  </Container>
  )
}


export default Login
