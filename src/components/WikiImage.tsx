import { Image, NextChakraImageProps } from '@/components/Elements/Image/Image'
import { WikiTitle } from '@/services/nav-search'
import React from 'react'
import config from '@/config'

const PLACEHOLDER_IMAGE = `https://picsum.photos/seed/${
  Math.random() * 100000
}/300/300`

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export type WikiImageProps = Partial<NextChakraImageProps> & { wiki: WikiTitle }

export const WikiImage = (props: WikiImageProps) => {
  const { wiki, ...rest } = props

  const image = wiki.images?.[0]?.id
  const imageURL = `${config.pinataBaseUrl}${image}`

  const imgSrc = image ? imageURL : PLACEHOLDER_IMAGE

  return (
    <Image
      src={imgSrc}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...rest}
    />
  )
}
