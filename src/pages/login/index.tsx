import React, { useEffect } from 'react'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useAddress } from '@/hooks/useAddress'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
      <div className="max-w-2xl mx-auto mt-24 mb-32 px-4 lg:px-8 2xl:px-0">
        <h1 className="text-2xl font-bold mb-4">{t('loginConnectWallet')}</h1>
        <Connectors handleRedirect={handleRedirect} />
      </div>
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
