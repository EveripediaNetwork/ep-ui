import React, { useEffect } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import { WagmiConfig, createConfig } from 'wagmi'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { connectors, publicClient, webSocketPublicClient } from '@/config/wagmi'
import { extractAuthToken } from '@/utils/extractAuthToken'

export const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export const WalletConnectWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <WagmiConfig config={client}>{children}</WagmiConfig>
}

//TODO:
// Wrap in rainbow config and ensure it works by morning before 10am

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
    <WalletConnectWrapper>
      <Container centerContent mt="8" mb="24">
        <Box w="full">
          <Heading mb={4} fontSize={23}>
            {t('loginConnectWallet')}
          </Heading>
          <Connectors handleRedirect={handleRedirect} />
        </Box>
      </Container>
    </WalletConnectWrapper>
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
