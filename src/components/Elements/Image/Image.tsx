import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

export type NextChakraImageProps = Omit<BoxProps, 'as'> &
  Omit<Omit<ImageProps, 'width'>, 'height'> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imgW?: number | string | any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imgH?: number | string | any
    hideOnError?: boolean
  }

export const Image = ({
  src,
  alt,
  imgW,
  imgH,
  priority,
  placeholder,
  blurDataURL,
  hideOnError,
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
      onError={e => {
        if (hideOnError) {
          e.currentTarget.style.visibility = 'hidden'
        }
      }}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      width={imgW}
      height={imgH}
    />
  </Box>
)
