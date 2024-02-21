import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { WagmiWrapper } from '@/components/Layout/WagmiWrapper'
import { useAddress } from '@/hooks/useAddress'

const Login = () => {
  const { t } = useTranslation('common')
  const { address: userAddress } = useAddress()
  const router = useRouter()

  const handleRedirect = () => {
    if (router.query.from) {
      router.push(`${router.query.from}`)
    } else {
      router.push('/')
    }
  }

  if (userAddress) {
    handleRedirect()
  }

  return (
    <WagmiWrapper>
      <Container centerContent mt="8" mb="24">
        <Box minW="min(90%, 300px)">
          <Heading mb={4} fontSize={23}>
            {t('loginConnectWallet')}
          </Heading>
          <Connectors handleRedirect={handleRedirect} />
        </Box>
      </Container>
    </WagmiWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
})
