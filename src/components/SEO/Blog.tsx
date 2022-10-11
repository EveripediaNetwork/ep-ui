import { NextSeo } from 'next-seo'
import React from 'react'

const BlogHeader = () => (
  <NextSeo
    title="Blog"
    description="Stay up to date with latest stories and gist brought to you by IQ.Wiki"
    canonical="https://iq.wiki/blog"
    openGraph={{
      title: 'Blog',
      description:
        'Stay up to date with latest stories and gist brought to you by IQ.Wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default BlogHeader
