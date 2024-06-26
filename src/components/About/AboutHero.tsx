import React from 'react'
import {
  Text,
  VStack,
  Box,
  Center,
  Icon,
  useColorModeValue,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Image } from '../Elements/Image/Image'
import IQLogo from './logos/IQLogo.svg'
import OrbitingCircles from '../magicui/orbiting-circles'

interface OrbitingCircleProps {
  iconName: string
  size: string
  delay: number
  radius: number
  orbitSize: number
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

  const responsiveRadius = useResponsiveValue(radius * 0.7, radius)
  const responsiveSize = useResponsiveValue(Number(size) * 0.6, Number(size))
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
        className={`h-${responsiveSize} w-${responsiveSize} z-10`}
      />
    </OrbitingCircles>
  )
}

const AboutHero = () => {
  const { t } = useTranslation('about')
  const orbits: OrbitingCircleProps[] = [
    { iconName: 'scale', size: '20', delay: 20, radius: 120, orbitSize: 60 },
    { iconName: 'car', size: '40', delay: 35, radius: 120, orbitSize: 60 },
    { iconName: 'jet', size: '20', delay: 10, radius: 120, orbitSize: 60 },
    { iconName: 'car', size: '40', delay: 5, radius: 120, orbitSize: 60 },
    {
      iconName: 'bored-ape',
      size: '20',
      delay: 20,
      radius: 240,
      orbitSize: 60,
      reverse: true,
    },
    {
      iconName: 'pink-circle',
      size: '20',
      delay: 18,
      radius: 240,
      orbitSize: 60,
      reverse: true,
    },
    {
      iconName: 'hammer',
      size: '20',
      delay: 35,
      radius: 240,
      reverse: true,
      orbitSize: 60,
    },
    {
      iconName: 'globe',
      size: '20',
      delay: 10,
      radius: 240,
      reverse: true,
      orbitSize: 60,
    },
    {
      iconName: 'car',
      size: '20',
      delay: 5,
      radius: 240,
      reverse: true,
      orbitSize: 60,
    },
  ]

  const boxHeight = useResponsiveValue(300, 500)

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
          height={[`${boxHeight}px`, '500px']}
          width={['100%', 'full']}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          marginTop={16}
        >
          <Icon as={IQLogo} boxSize={15} className="z-10" />

          {orbits.map((orbit, index) => (
            <Orbit key={index} {...orbit} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default AboutHero
