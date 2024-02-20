import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { extractAuthToken } from '@/utils/extractAuthToken'
import { RainbowConfigWrapper } from '@/components/Layout/Layout/WagmiWrapper'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SignTokenButton } from '@/components/Layout/WalletDrawer/SignTokenButton'

const Login = ({ address }: { address: string | null }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const handleRedirect = () => {
    if (router.query.from) {
      router.push(`${router.query.from}`)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    if (address) {
      handleRedirect()
    }
  }, [address, router])

  return (
    <RainbowConfigWrapper>
      <Container centerContent mt="8" mb="24">
        <Box w="full">
          <Heading mb={4} fontSize={23} textAlign="center">
            {t('loginConnectWallet')}
          </Heading>
          <Box
            mt="8"
            rounded="md"
            border="1px"
            borderColor="gray.200"
            bg="gray.100"
            _dark={{ borderColor: 'gray.500', bg: 'gray.700' }}
          >
            <VStack spacing="4" p="4" alignItems="center">
              <Text mb="4" fontSize="xl">
                Step 1: Connect your wallet
              </Text>
              <ConnectButton />
            </VStack>
            <Divider
              borderColor="gray.200"
              _dark={{ borderColor: 'gray.500' }}
            />
            <VStack spacing="4" p="4" alignItems="center">
              <Text mb="4" fontSize="xl">
                Step 2: Authenticate your wallet
              </Text>
              <SignTokenButton handleRedirect={handleRedirect} />
            </VStack>
          </Box>
        </Box>
      </Container>
    </RainbowConfigWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const { address } = extractAuthToken(req)

  return {
    props: {
      address,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default Login
