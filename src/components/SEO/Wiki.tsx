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
}: WikiHeaderProps) => (
  <>
    <ArticleJsonLd
      url={`${process.env.NEXT_PUBLIC_DOMAIN}/wiki/${slug}`}
      title={title}
      images={[mainImage]}
      datePublished={datePublished || ''}
      dateModified={dateModified || ''}
      authorName={author}
      publisherName="Everipedia"
      publisherLogo={`${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`}
      description={description}
    />
    <NextSeo
      title={title}
      noindex={noindex}
      openGraph={{
        title,
        description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/_next/image?url=${mainImage}&w=1200&q=95`,
          },
        ],
      }}
    />
  </>
)
