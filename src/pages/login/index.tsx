import React, { useEffect } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { extractAuthToken } from '@/utils/extractAuthToken'
import { RainbowConfigWrapper } from '@/components/Layout/Layout/WagmiWrapper'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
    <RainbowConfigWrapper>
      <Container centerContent mt="8" mb="24">
        <Box w="full">
          <Heading mb={4} fontSize={23}>
            {t('loginConnectWallet')}
          </Heading>
          <ConnectButton />
          {/* <Connectors handleRedirect={handleRedirect} /> */}
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
