import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BigPicture from 'bigpicture'
import { Box, BoxProps, Icon } from '@chakra-ui/react'
import { RiPlayLine, RiVolumeUpLine } from 'react-icons/ri'

interface MediaPreviewTypes {
  type: 'image' | 'video' | 'youtube' | 'vimeo' | 'iframe' | 'audio'
  src: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  animationStart?: () => void
  animationEnd?: () => void
  onClose?: () => void
  onOpen?: () => void
  onError?: () => void
  onChangeImage?: () => void
  noLoader?: boolean
}

interface BigPictureTypes {
  el: HTMLElement
  imgSrc?: string
  vidSrc?: string
  iframeSrc?: string
  audio?: string
  vimeoSrc?: string
  ytSrc?: string
  ytNoCookie?: boolean
  gallery?: string
  galleryAttribute?: string
  dimensions?: [number, number]
  noLoader?: boolean
  animationStart?: () => void
  animationEnd?: () => void
  onClose?: () => void
  onChangeImage?: () => void
  onError?: () => void
  onOpen?: () => void
}
const MediaPreview = ({
  type = 'image',
  src,
  children,
  className,
  style,
  onClick,
  animationStart,
  animationEnd,
  onClose,
  onError,
  onChangeImage,
  noLoader,
  ...rest
}: MediaPreviewTypes & BoxProps) => {
  const elRef = React.useRef(null)
  const isPlayable =
    type === 'video' ||
    type === 'youtube' ||
    type === 'vimeo' ||
    type === 'audio'
  const zoomHandle = () => {
    if (!elRef.current) return
    const options: BigPictureTypes = {
      el: elRef.current,
    }
    switch (type) {
      case 'image':
        options.imgSrc = src
        break
      case 'video':
        options.vidSrc = src
        break
      case 'youtube':
        // eslint-disable-next-line prefer-destructuring
        options.ytSrc = src.split('=')[1]
        break
      case 'iframe':
        options.iframeSrc = src
        break
      case 'audio':
        options.audio = src
        break
      case 'vimeo':
        options.vimeoSrc = src.replace(/(https?:\/\/)?(www\.)?vimeo\.com\//, '')
        break
      default:
        options.imgSrc = src
        break
    }

    if (typeof onError === 'function') {
      options.onError = onError
    }

    if (typeof animationStart === 'function') {
      options.animationStart = animationStart
    }
    if (typeof animationEnd === 'function') {
      options.animationEnd = animationEnd
    }
    if (typeof onClose === 'function') {
      options.onClose = onClose
    }
    if (typeof onChangeImage === 'function') {
      options.onChangeImage = onChangeImage
    }
    if (noLoader) {
      options.noLoader = true
    }

    BigPicture(options)
  }

  return (
    <Box
      cursor="pointer"
      className={`bigpicture link picture ${className || ''}`}
      onClick={() => {
        if (onClick) onClick()
        zoomHandle()
      }}
      ref={elRef}
      position="relative"
      style={{ display: 'inline-block', ...style }}
      {...rest}
    >
      {isPlayable && (
        <Icon
          as={type === 'audio' ? RiVolumeUpLine : RiPlayLine}
          fontSize="30px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          bgColor="whiteAlpha.400"
          borderRadius="50%"
          p={1}
          w={8}
          h={8}
        />
      )}
      {children}
    </Box>
  )
}

export default MediaPreview
