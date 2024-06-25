import React from 'react'
import { Box, Center, Icon, useColorModeValue, Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Image } from '../Elements/Image/Image'
import IQLogo from './logos/IQLogo.svg'
import OrbitingCircles from '../magicui/orbiting-circles'

interface OrbitingCircleProps {
  imagesrc: string
  size: number
  delay?: number
  radius: number
  reverse?: boolean
  imageSize?: number
}

const OrbitingCircle = ({
  imagesrc,
  size,
  delay,
  radius,
  reverse,
  imageSize,
}: OrbitingCircleProps) => (
  <OrbitingCircles
    className={`h-${size} w-${size} border-none bg-transparent`}
    duration={20}
    delay={delay}
    radius={radius}
    reverse={reverse}
  >
    <Image src={imagesrc} alt="" className={`h-${imageSize} w-${imageSize}`} />
  </OrbitingCircles>
)

const AboutHero = () => {
  const { t } = useTranslation('about')
  const getIconPath = (iconName: any) => {
    const mode = useColorModeValue('light', 'dark')
    return `/images/orbit/${iconName}-${mode}.svg`
  }

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

        <h1 className="text-center  mx-auto text-5xl  max-w-6xl text-3xl lg:text-5xl sm:text-md font-semibold text-gray-800 dark:text-white/90 mt-4">
          {`${t('aboutHeroHeading')}`}
        </h1>

        <p className="text-gray-600 dark:text-white/80 mt-6 max-w-4xl text-center mx-auto text-sm lg:text-lg md:text-xl font-medium">
          {`${t('aboutHeroPhrase')}`}
        </p>

        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
          <Icon as={IQLogo} boxSize={16} />

          <OrbitingCircle
            imagesrc={`${getIconPath('scale')}`}
            size={60}
            delay={20}
            radius={80}
            imageSize={20}
          />
          <OrbitingCircle
            imagesrc={`${getIconPath('pink-circle')}`}
            size={64}
            delay={36}
            radius={80}
            imageSize={20}
          />
          <OrbitingCircle
            imagesrc={`${getIconPath('jet')}`}
            size={60}
            delay={10}
            radius={80}
            imageSize={20}
          />
          <OrbitingCircle
            imagesrc={`${getIconPath('pink-circle')}`}
            size={64}
            delay={5}
            radius={80}
            imageSize={20}
          />

          {/* Reverse Circles */}

          <OrbitingCircle
            imagesrc={`${getIconPath('bored-ape')}`}
            size={80}
            radius={190}
            reverse
            imageSize={20}
          />

          <OrbitingCircle
            imagesrc={`${getIconPath('pink-circle')}`}
            size={24}
            delay={36}
            radius={80}
            imageSize={10}
          />

          <OrbitingCircle
            imagesrc={`${getIconPath('hammer')}`}
            size={80}
            delay={20}
            radius={190}
            reverse
            imageSize={20}
          />
          <OrbitingCircle
            imagesrc={`${getIconPath('globe')}`}
            size={80}
            delay={10}
            radius={190}
            reverse
            imageSize={20}
          />

          <OrbitingCircle
            imagesrc={`${getIconPath('car')}`}
            size={80}
            radius={190}
            reverse
            imageSize={20}
          />
        </div>
      </Box>
    </Box>
  )
}

export default AboutHero
