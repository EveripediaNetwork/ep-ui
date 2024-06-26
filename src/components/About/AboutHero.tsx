import React from 'react'
import {
  Text,
  VStack,
  Box,
  Center,
  useColorModeValue,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Image } from '../Elements/Image/Image'
// import IQLogo from './logos/IQLogo.svg'
import OrbitingCircles from '../magicui/orbiting-circles'

interface OrbitingCircleProps {
  iconName: string
  size: number
  delay: number
  radius: number
  reverse?: boolean
}
const useResponsiveValue = (mobileValue: number, desktopValue: number) => {
  return useBreakpointValue({ base: mobileValue, md: desktopValue })
}

const Orbit: React.FC<OrbitingCircleProps> = ({
  iconName,
  size,
  delay,
  radius,
  reverse = false,
}) => {
  const getIconPath = (name: string) => {
    const mode = useColorModeValue('light', 'dark')
    return `/images/orbit/${name}-${mode}.svg`
  }

  const responsiveRadius = useResponsiveValue(radius * 0.6, radius)
  const responsiveSize = useResponsiveValue(Number(size) * 0.5, size)
  return (
    <OrbitingCircles
      className="border-none bg-transparent"
      duration={20}
      delay={delay}
      radius={responsiveRadius}
      reverse={reverse}
    >
      <Image
        src={getIconPath(iconName)}
        alt="orbit"
        width={responsiveSize}
        height={responsiveSize}
      />
    </OrbitingCircles>
  )
}

const AboutHero = () => {
  const { t } = useTranslation('about')
  const orbits: OrbitingCircleProps[] = [
    { iconName: 'scale', size: 24, delay: 20, radius: 110 },
    { iconName: 'pink-circle', size: 52, delay: 35, radius: 110 },
    { iconName: 'jet', size: 24, delay: 10, radius: 110 },
    { iconName: 'pink-circle', size: 52, delay: 5, radius: 110 },
    {
      iconName: 'bored-ape',
      size: 24,
      delay: 20,
      radius: 280,
      reverse: true,
    },
    {
      iconName: 'pink-circle',
      size: 24,
      delay: 18,
     radius: 280,
      reverse: true,
    },
    {
      iconName: 'hammer',
      size: 24,
      delay: 35,
     radius: 280,
      reverse: true,
    },
    {
      iconName: 'globe',
      size: 24,
      delay: 10,
     radius: 280,
      reverse: true,
    },
    {
      iconName: 'car',
      size: 24,
      delay: 5,
     radius: 280,
      reverse: true,
    },
  ]

  const boxHeight = useResponsiveValue(400, 700)

  return (
    <Box px={4}>
      <Box maxW="7xl" mx="auto">
        <Center>
          <Heading
            fontSize="base"
            fontWeight="semibold"
            color="brand.500"
            _dark={{ color: 'brand.800' }}
          >
            {t('aboutHeroTitle')}
          </Heading>
        </Center>

        <VStack spacing={6} align="center" maxW="6xl" mx="auto" mt={4}>
          <Heading
            as="h1"
            textAlign="center"
            fontSize={['xl', '3xl', '3xl', '5xl']}
            fontWeight="semibold"
            color="gray.800"
            _dark={{ color: 'whiteAlpha.900' }}
          >
            {t('aboutHeroHeading')}
          </Heading>
          <Text
            color="gray.600"
            _dark={{ color: 'whiteAlpha.800' }}
            maxW="4xl"
            textAlign="center"
            fontSize={['sm', 'md', 'xl', 'lg']}
            fontWeight="medium"
          >
            {t('aboutHeroPhrase')}
          </Text>
        </VStack>

        <Box
          position="relative"
          display="flex"
          height={[`${boxHeight}px`]}
          width={['100%', 'full']}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          marginTop={16}
        >
          {/* <Icon as={IQLogo} w={15} h={18} /> */}

          {orbits.map((orbit, index) => (
            <Orbit key={index} {...orbit} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default AboutHero
