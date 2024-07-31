import React, { useEffect } from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useAddress } from '@/hooks/useAddress'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Login = () => {
  const { t } = useTranslation('common')
  const { address: userAddress } = useAddress()
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.user)

  const handleRedirect = () => {
    if (router.query.from) {
      router.push(`${router.query.from}`)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    if (userAddress && token) {
      handleRedirect()
    }
  }, [userAddress, token])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://assets.auth.magic.link" />
      </Head>
      <Container centerContent mt="8" mb="24">
        <Box minW="min(90%, 300px)" w="full">
          <Heading mb={4} fontSize={23}>
            {t('loginConnectWallet')}
          </Heading>
          <Connectors handleRedirect={handleRedirect} />
        </Box>
      </Container>
    </>
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
