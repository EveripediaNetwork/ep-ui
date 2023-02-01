import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

export type NextChakraImageProps = Omit<Omit<BoxProps, 'as'>, 'objectFit'> &
  Omit<Omit<ImageProps, 'width'>, 'height'> & {
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
  ...rest
}: NextChakraImageProps) => (
  <Box
    h={`${imgBoxSize}px`}
    w={`${imgBoxSize}px`}
    {...rest}
    overflow="hidden"
    position="relative"
  >
    <NextImage
      quality={95}
      style={{
        objectFit,
        objectPosition: 'center',
        width: '100%',
        height: '100%',
      }}
      fill={!imgBoxSize}
      src={src}
      alt={alt}
      onError={e => {
        if (hideOnError) {
          e.currentTarget.style.visibility = 'hidden'
        }
      }}
      priority={priority}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      width={imgBoxSize}
      height={imgBoxSize}
    />
  </Box>
)
