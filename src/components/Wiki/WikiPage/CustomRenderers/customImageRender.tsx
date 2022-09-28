import { Image } from '@/components/Elements/Image/Image'
import React from 'react'

export const customImageRender = ({
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return (
    <Image
      h="300px"
      my={2}
      objectFit="contain"
      src={props.src || ''}
      alt="wiki"
    />
  )
}
