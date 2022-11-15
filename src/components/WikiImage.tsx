import React, { useEffect, useState } from 'react'
import { Image, NextChakraImageProps } from '@/components/Elements/Image/Image'

const PLACEHOLDER_IMAGE = `/broken-image.png`

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#F9D1F4" offset="20%" />
      <stop stop-color="#F399E8" offset="50%" />
      <stop stop-color="#F9D1F4" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#F9D1F4" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export type WikiImageProps = Partial<NextChakraImageProps> & {
  imageURL?: string
  alt: string
}

export const WikiImage = ({ imageURL, ...rest }: WikiImageProps) => {
  const [src, setSrc] = useState(imageURL || PLACEHOLDER_IMAGE)

  useEffect(() => {
    setSrc(imageURL || PLACEHOLDER_IMAGE)
  }, [imageURL])

  return (
    <Image
      src={src}
      placeholder="blur"
      onError={() => setSrc(PLACEHOLDER_IMAGE)}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...rest}
    />
  )
}
