import { DefaultSeo } from 'next-seo'
import React from 'react'
import { NextRouter } from 'next/dist/shared/lib/router/router'
import { useTranslation } from 'next-i18next'

interface SEOHeaderProps {
  router: NextRouter
}

const SEOHeader = ({ router }: SEOHeaderProps) => {
  const { t } = useTranslation('common')
  return (
    <DefaultSeo
      title={t('defaultSeoTitle')}
      titleTemplate={t('defaultSeoTitleTemplate')}
      description={t('defaultSeoDescription')}
      canonical={`https://iq.wiki${router.asPath || ''}`}
      openGraph={{
        title: 'IQ.wiki | Crypto Encyclopedia',
        description: "World's largest crypto knowledge base",
        type: 'website',
        site_name: 'IQ.wiki',
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
        cardType: 'summary_large_image',
        handle: '@IQWiki',
        site: 'IQWiki',
      }}
    />
  )
}

export default SEOHeader
