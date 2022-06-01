import { NextSeo } from 'next-seo'
import React from 'react'

interface WikiHeaderProps {
  title: string
  description: string
  mainImage: string
}

export const WikiHeader = ({
  title,
  description,
  mainImage,
}: WikiHeaderProps) => (
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
)
