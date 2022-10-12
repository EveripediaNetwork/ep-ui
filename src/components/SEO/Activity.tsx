import React from 'react'
import { NextSeo } from 'next-seo'

const ActivityHeader = () => (
  <NextSeo
    title="Activities"
    description="Check out recent wiki activities"
    canonical="https://iq.wiki/static/activity"
    openGraph={{
      title: 'Activities',
      description: 'Check out recent wiki activities',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default ActivityHeader
