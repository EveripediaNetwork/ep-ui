import { env } from '@/env.mjs'
import { NextSeo } from 'next-seo'
import * as DOMPurify from 'dompurify'
import React from 'react'
import Head from 'next/head'
interface WikiHeaderProps {
  slug: string
  title: string
  description: string
  mainImage: string
  datePublished?: string
  dateModified?: string
  author: string
  noindex?: boolean
  avgRating?: number
  totalRatings?: number
}

export const WikiHeader = ({
  slug,
  title,
  description,
  mainImage,
  datePublished,
  dateModified,
  author,
  noindex = false,
  avgRating,
  totalRatings,
}: WikiHeaderProps) => {
  const combinedStructuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`,
    name: title,
    description: description,
    image: [mainImage],
    datePublished: datePublished || '',
    dateModified: dateModified || '',
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IQWiki',
      logo: `${env.NEXT_PUBLIC_DOMAIN}/images/icons/favicon.ico`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`,
    },
    mediaObject: {
      '@type': 'MediaObject',
      contentUrl: `${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`,
      name: title,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating?.toString() || '0',
        reviewCount: totalRatings?.toString() || '0',
      },
    },
  })
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        noindex={noindex}
        openGraph={{
          title,
          description,
          images: [
            {
              url: `${env.NEXT_PUBLIC_DOMAIN}/_next/image?url=${mainImage}&w=1200&q=95`,
            },
          ],
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          // biome-ignore lint: reason=nextjs-no-xss
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(combinedStructuredData),
          }}
        />
      </Head>
    </>
  )
}
