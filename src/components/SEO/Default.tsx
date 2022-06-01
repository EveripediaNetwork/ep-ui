import { DefaultSeo } from 'next-seo'
import React from 'react'
import { NextRouter } from 'next/dist/shared/lib/router/router'

interface SEOHeaderProps {
  router: NextRouter
}

const SEOHeader = ({ router }: SEOHeaderProps) => (
  <DefaultSeo
    title="Everipedia"
    titleTemplate="%s · Everipedia"
    description="World's largest crypto knowledge base"
    canonical={`https://everipedia.org${router.asPath || ''}`}
    openGraph={{
      title: 'Everipedia',
      description: "World's largest crypto knowledge base",
      type: 'website',
      site_name: 'Everipedia',
      images: [
        {
          url: `https://i.imgur.com/u42cq1C.png`,
          width: 1024,
          height: 512,
          alt: 'Everipedia',
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
