import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

export type NextChakraImageProps = Omit<BoxProps, 'as'> &
  ImageProps & {
    imgW?: number | string | undefined
    imgH?: number | string | undefined
  }

export const Image = ({
  src,
  alt,
  imgW,
  imgH,
  priority,
  placeholder,
  blurDataURL,
  objectFit = 'cover',
  ...rest
}: NextChakraImageProps) => (
  <Box h={imgH} w={imgW} {...rest} overflow="hidden" position="relative">
    <NextImage
      quality={95}
      objectFit={objectFit}
      objectPosition="center"
      layout={imgW && imgH ? 'fixed' : 'fill'}
      src={src}
      alt={alt}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      width={imgW}
      height={imgH}
    />
  </Box>
)
