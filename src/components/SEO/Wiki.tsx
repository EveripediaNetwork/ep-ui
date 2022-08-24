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
}

export const WikiHeader = ({
  slug,
  title,
  description,
  mainImage,
  datePublished,
  dateModified,
  author,
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
      openGraph={{
        title,
        description,
        images: [
          {
            url: mainImage,
          },
        ],
      }}
    />
  </>
)
