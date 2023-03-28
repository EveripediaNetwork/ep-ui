import { DefaultSeo } from 'next-seo'
import React from 'react'
import { NextRouter } from 'next/dist/shared/lib/router/router'

interface SEOHeaderProps {
  router: NextRouter
}

const SEOHeader = ({ router }: SEOHeaderProps) => (
  <DefaultSeo
    title="IQ.Wiki | Largest Blockchain & Crypto Encyclopedia"
    titleTemplate="%s | IQ.Wiki"
    description="World's largest Blockchain & Crypto Encyclopedia"
    canonical={`https://iq.wiki${router.asPath || ''}`}
    openGraph={{
      title: 'IQ.Wiki | Crypto Encyclopedia',
      description: "World's largest crypto knowledge base",
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: 'https://iq.wiki/images/defaults/og-image-default.png',
          width: 1200,
          height: 630,
          alt: 'IQ.Wiki | Crypto Encyclopedia',
        },
      ],
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default SEOHeader
