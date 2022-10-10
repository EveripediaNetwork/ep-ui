import React from 'react'
import { NextSeo } from 'next-seo'

const ActivityHeader = () => (
  <NextSeo
    title="Activities"
    description="Check out recent wiki activities"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/static/activity"
    openGraph={{
      title: 'Activities',
      description: 'Check out recent wiki activities',
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

export default ActivityHeader
