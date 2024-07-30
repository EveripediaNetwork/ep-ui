import { useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export type AboutGPTMockupType = {
  bg: { light: string; dark: string }
  w: number
  h: number
}

const AboutGPTMockup = ({ bg, w, h }: AboutGPTMockupType) => {
  const mockup = useColorModeValue(bg.light, bg.dark)

  return <Image src={mockup} alt="iqgpt-mockup" width={w} height={h} />
}

export default AboutGPTMockup
