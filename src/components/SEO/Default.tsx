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
          url: 'https://iq.wiki/android-chrome-512x512.png',
          width: 512,
          height: 512,
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
