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
      w={{ base: '85vw', md: '570px', xl: '1020px' }}
      h={{ base: '375px', md: '550px', xl: '708px' }}
    >
      <Image src={mockup} alt="iqgpt-mockup" width={w} height={h} />
    </AspectRatio>
  )
}

export default AboutGPTMockup
