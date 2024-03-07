import { env } from '@/env.mjs'
import { NextSeo } from 'next-seo'
import DOMPurify from 'isomorphic-dompurify'
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

type combinedStructuredDataType = {
  '@context': string
  '@type': string
  '@id': string
  name: string
  description: string
  image: string[]
  datePublished: string
  dateModified: string
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
    logo: string
  }
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
  mediaObject?: {
    '@type': string
    contentUrl: string
    name: string
    aggregateRating: {
      '@type': string
      ratingValue: string
      reviewCount: string
    }
  }
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
  const combinedStructuredData: combinedStructuredDataType = {
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
  }

  if (totalRatings && avgRating) {
    combinedStructuredData.mediaObject = {
      '@type': 'MediaObject',
      contentUrl: `${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`,
      name: title,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toString(),
        reviewCount: totalRatings.toString(),
      },
    }
  }

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
            __html: DOMPurify.sanitize(JSON.stringify(combinedStructuredData)),
          }}
        />
      </Head>
    </>
  )
}
