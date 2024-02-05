import Image from 'next/image'
import React from 'react'
import { cfLoader } from '@/components/Elements/Image/Image'

export const customImageRender = ({
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const { src } = props
  return (
    <Image
      quality={95}
      loader={
        typeof src === 'string' && src.startsWith('http') ? cfLoader : undefined
      }
      src={src || ''}
      alt="wiki"
      width={900}
      height={400}
      style={{
        width: 'auto',
        height: 'auto',
        position: 'static',
      }}
    />
  )
}
