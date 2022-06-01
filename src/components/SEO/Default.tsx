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
    description="Everipedia description"
    canonical={`https://everipedia.org${router.asPath || ''}`}
    openGraph={{
      title: 'Everipedia',
      description: 'Everipedia description',
      type: 'website',
      site_name: 'Everipedia',
      images: [
        {
          url: `https://everipedia.org/social.png`,
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
