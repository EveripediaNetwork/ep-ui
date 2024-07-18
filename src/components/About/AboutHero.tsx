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
import IQLogo from './logos/IQLogo.png'
import OrbitingCircles from '../magicui/orbiting-circles'
import { cn } from '~/@lib/utils'

interface OrbitingCircleProps {
  iconName: string
  size: [number, number]
  delay: number
  radius: [number, number]
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

  // radius[0] and radius[1] represent the radii for
  // the base and md breakpoints respectively
  const responsiveRadius = useResponsiveValue(radius[0], radius[1])

  // size[0] and size[1] represent the size of the orbit images for
  // the base and md breakpoints respectively
  const responsiveSize = useResponsiveValue(size[0], size[1])

  return (
    <OrbitingCircles
      className="border-none bg-transparent z-10"
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
        objectFit={'contain'}
        className={cn(
          'z-30 bg-white dark:bg-gray-800 rounded-full',
          iconName === 'pink-circle' && '-z-10',
        )}
      />
    </OrbitingCircles>
  )
}

const AboutHero = () => {
  const { t } = useTranslation('about')

  const orbits: OrbitingCircleProps[] = [
    { iconName: 'scale', size: [16, 24], delay: 20, radius: [80, 140] },
    { iconName: 'pink-circle', size: [20, 52], delay: 35, radius: [80, 140] },
    { iconName: 'jet', size: [16, 24], delay: 10, radius: [80, 140] },
    { iconName: 'pink-square', size: [24, 64], delay: 5, radius: [80, 140] },
    {
      iconName: 'bored-ape',
      size: [16, 24],
      delay: 20,
      radius: [145, 295],
      reverse: true,
    },
    {
      iconName: 'pink-circle',
      size: [16, 24],
      delay: 18,
      radius: [145, 295],
      reverse: true,
    },
    {
      iconName: 'hammer',
      size: [16, 24],
      delay: 35,
      radius: [145, 295],
      reverse: true,
    },
    {
      iconName: 'globe',
      size: [16, 24],
      delay: 10,
      radius: [145, 295],
      reverse: true,
    },
    {
      iconName: 'car',
      size: [16, 24],
      delay: 5,
      radius: [145, 295],
      reverse: true,
    },
  ]

  const boxHeight = useResponsiveValue(400, 700)

  return (
    <Box px={4}>
      <Box maxW="7xl" mx="auto">
        <Box px={{ base: 6, lg: 16 }} pt={{ base: '10', lg: 15 }}>
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
        </Box>

        <Box
          position="relative"
          display="flex"
          height={[`${boxHeight}px`]}
          width={['100%', 'full']}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          marginTop={8}
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={30}
          >
            <Image
              src={IQLogo}
              alt="IQLogo"
              objectFit="contain"
              boxSize={{ base: 24, md: 140 }}
              w="full"
              h="full"
            />
          </Box>
          {orbits.map((orbit, index) => (
            <Orbit key={index} {...orbit} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default AboutHero
