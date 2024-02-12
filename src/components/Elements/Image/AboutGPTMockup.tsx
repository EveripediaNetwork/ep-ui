import { AspectRatio, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Image } from './Image'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'

export type AboutGPTMockupType = {
  bg: { light: string; dark: string }
  w: number
  h: number
}

const AboutGPTMockup = ({ bg, w, h }: AboutGPTMockupType) => {
  const mockup = useColorModeValue(bg.light, bg.dark)

  return (
    <AspectRatio
      ratio={WIKI_IMAGE_ASPECT_RATIO}
      w={{ base: '85vw', md: '570px', lg: '800px', xl: '1020px' }}
      h={{ base: '375px', md: '550px', lg: '600px', xl: '708px' }}
    >
      <Image
        src={mockup}
        alt="iqgpt-mockup"
        width={w}
        height={h}
        sizes="(max-width: 639px) 85vw, (min-width: 640px) and (max-width: 767px) 570px, (min-width: 768px) and (max-width: 1023px) 800px, (min-width: 1024px) 1020px"
      />
    </AspectRatio>
  )
}

export default AboutGPTMockup
