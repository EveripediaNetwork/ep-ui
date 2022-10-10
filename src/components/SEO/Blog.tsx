import { NextSeo } from 'next-seo'
import React from 'react'

const BlogHeader = () => (
  <NextSeo
    title="Blog | IQ.Wiki | Largest Blockchain & Crypto Encyclopedia "
    description="Stay up to date with latest stories and gist brought to you by IQ.Wiki"
    titleTemplate="%s | IQ.Wiki"
    canonical="https://iq.wiki/blog"
    openGraph={{
      title: 'Blog | IQ.Wiki | Largest Blockchain & Crypto Encyclopedia',
      description:
        'Stay up to date with latest stories and gist brought to you by IQ.Wiki',
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

export default BlogHeader
