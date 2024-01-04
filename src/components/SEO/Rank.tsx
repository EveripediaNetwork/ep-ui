import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

const RankHeader = () => {
  const { t } = useTranslation('rank')
  return (
    <NextSeo
      title={t('rankingSeoTitle')}
      description={t('rankingSeoDescription')}
      canonical="https://iq.wiki/rank"
      openGraph={{
        title: t('rankingOGTitle'),
        description: t('rankingOGDescription'),
        images: [
          {
            url: 'https://iq.wiki/images/defaults/og-image-default.png',
            width: 1200,
            height: 630,
            alt: 'IQ.wiki | Crypto Encyclopedia',
          },
        ],
      }}
      twitter={{
        cardType: 'summary',
        handle: '@IQWiki',
        site: 'IQWiki',
      }}
    />
  )
}

export default RankHeader
