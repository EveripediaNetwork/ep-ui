import React from 'react'
import { Box, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Image } from '../Elements/Image/Image'

const AboutHero = () => {
  const { t } = useTranslation()
  const aboutHeroSrc = useColorModeValue(
    'about-hero-light.svg',
    'about-hero-dark.svg',
  )
  return (
    <HStack
      mx="auto"
      maxW={{ base: '100%', xl: '90%', '2xl': '1280px' }}
      spacing="2"
      flexDirection={{ base: 'column', xl: 'row' }}
    >
      <Box mx="auto" mb={{ base: 10, xl: 0 }}>
        <Heading
          textAlign={{ base: 'center', xl: 'left' }}
          w={{ base: '80%', md: '100%' }}
          pr={{ base: '0', xl: '8' }}
          mx={{ base: 'auto', xl: 0 }}
          fontSize={{ base: '32', md: '36', '2xl': '42' }}
          mt={10}
          mb={{ base: 5, xl: 10 }}
          fontWeight="black"
          lineHeight="shorter"
        >
          {`${t('aboutHeroHeading')}`}
        </Heading>
        <Text
          textAlign={{ base: 'center', xl: 'left' }}
          fontSize={{ base: 'sm', md: 'md', xl: 'lg' }}
          mb={4}
          mx={{ md: 'auto', xl: '0' }}
          w={{ base: '100%', md: '80%', xl: '80%' }}
        >{`${t('aboutHeroPhrase')}`}</Text>
      </Box>
      <Box>
        <Image
          objectFit="contain"
          imgH={450}
          imgW={450}
          maxW="90vw"
          className="teamMember__image"
          src={`/images/${aboutHeroSrc}`}
          alt="Bringing knowledge to the blockchain."
          priority
        />
      </Box>
    </HStack>
  )
}

export default AboutHero
