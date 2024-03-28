import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageLoader, ImageProps } from 'next/image'

interface CfLoaderArgs {
  src: string
  width: number
  quality?: number
}

const BASE_URL = 'https://iq.wiki'

export const cfLoader: ImageLoader = ({
  src,
  width,
  quality,
}: CfLoaderArgs) => {
  const params = [`width=${width}`, 'format=auto']
  if (quality) params.push(`quality=${quality}`)
  const paramsString = params.join(',')
  return `${BASE_URL}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
}

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src
}

export type NextChakraImageProps = Omit<Omit<BoxProps, 'as'>, 'objectFit'> &
  Omit<Omit<ImageProps, 'width'>, 'height'> & {
    imgW?: number
    imgH?: number
    imgBoxSize?: number
    hideOnError?: boolean
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  }

export const Image = ({
  src,
  alt,
  priority,
  placeholder,
  blurDataURL,
  hideOnError,
  sizes,
  objectFit = 'cover',
  imgBoxSize,
  imgW,
  imgH,
  quality = 95,
  ...rest
}: NextChakraImageProps) => (
  <Box
    h={`${imgBoxSize || imgH}px`}
    w={`${imgBoxSize || imgW}px`}
    {...rest}
    overflow="hidden"
    position="relative"
  >
    <NextImage
      quality={quality}
      style={{
        objectFit,
        objectPosition: 'top',
        width: '100%',
        height: '100%',
      }}
      loader={
        typeof src === 'string' && src.startsWith('http') ? cfLoader : undefined
      }
      fill={!imgBoxSize && !(imgW && imgH)}
      src={src}
      alt={alt}
      onError={(e) => {
        if (hideOnError) {
          e.currentTarget.style.visibility = 'hidden'
        }
      }}
      priority={priority}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      width={imgBoxSize || imgW}
      height={imgBoxSize || imgH}
    />
  </Box>
)
