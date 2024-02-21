import { env } from '@/env.mjs'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import React from 'react'

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
}: WikiHeaderProps) => (
  <>
    <ArticleJsonLd
      url={`${env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`}
      title={title}
      images={[mainImage]}
      datePublished={datePublished || ''}
      dateModified={dateModified || ''}
      authorName={author}
      publisherName="IQWiki"
      publisherLogo={`${env.NEXT_PUBLIC_DOMAIN}/images/icons/favicon.ico`}
      description={description}
      aggregateRating={{
        ratingValue: avgRating?.toString() || '0',
        reviewCount: totalRatings?.toString() || '0',
      }}
    />
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
  </>
)
