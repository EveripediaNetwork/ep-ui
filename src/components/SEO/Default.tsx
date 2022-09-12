import { DefaultSeo } from 'next-seo'
import React from 'react'
import { NextRouter } from 'next/dist/shared/lib/router/router'

interface SEOHeaderProps {
  router: NextRouter
}

const SEOHeader = ({ router }: SEOHeaderProps) => (
  <DefaultSeo
    title="IQ.Wiki"
    titleTemplate="%s · IQ.Wiki"
    description="World's largest crypto knowledge base"
    canonical={`https://iq.wiki${router.asPath || ''}`}
    openGraph={{
      title: 'IQ.Wiki',
      description: "World's largest crypto knowledge base",
      type: 'website',
      site_name: 'IQ.Wiki',
      images: [
        {
          url: `https://i.imgur.com/u42cq1C.png`,
          width: 1024,
          height: 512,
          alt: 'IQ.Wiki',
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
