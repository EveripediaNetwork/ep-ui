import React from 'react'
import { Box, Heading, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Image } from '../Elements/Image/Image'

const AboutHero = () => {
  const { t } = useTranslation()
  const aboutHeroSrc = useColorModeValue(
    'AboutHeroLight.png',
    'AboutSecHeroDark.png',
  )
  return (
    <HStack
      mx="auto"
      maxW={{ base: '100%', lg: '90%' }}
      spacing="2"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box mx="auto" mb={{ base: 10, lg: 0 }}>
        <Heading
          textAlign={{ base: 'center', lg: 'left' }}
          w={{ base: '80%', md: '85%' }}
          mx={{ base: 'auto', lg: 0 }}
          fontSize={{ base: '32', md: '42' }}
          mt={10}
          mb={{ base: 5, lg: 10 }}
          fontWeight="black"
          lineHeight="shorter"
        >
          {`${t('aboutHeroHeading')}`}
        </Heading>
        <Text
          textAlign={{ base: 'center', lg: 'left' }}
          fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
          mb={4}
          w={{ base: '80%', md: '80%' }}
        >{`${t('aboutHeroPhrase')}`}</Text>
      </Box>
      <Box>
        <Image
          imgH={{ base: '400px', lg: '500px' }}
          imgW={{ base: '400px', lg: '500px' }}
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
