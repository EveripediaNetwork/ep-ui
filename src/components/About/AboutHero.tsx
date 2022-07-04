import React from 'react'
import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const AboutHero = () => {
  const { t } = useTranslation()
  const aboutHeroSrc = useColorModeValue(
    'AboutSecHeroLight.png',
    'AboutSecHeroDark.png',
  )
  return (
    <HStack
      mx="auto"
      maxW={{ base: '100%', lg: '90%', '2xl': '65%' }}
      spacing={{ lg: '5%', base: 0, md: '10%', '2xl': '20%' }}
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box mb={{ base: 10, lg: 0 }}>
        <Heading
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          mt={10}
          mb={{ base: 5, lg: 10 }}
          letterSpacing="wider"
          fontWeight="black"
          lineHeight="shorter"
          fontSize={{ base: '2xl', sm: '30', md: '44' }}
        >{`${t('aboutHeroHeading')}`}</Heading>
        <Text
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
          letterSpacing="wider"
          mb={4}
        >{`${t('aboutHeroPhrase')}`}</Text>
      </Box>
      <Image
        src={`/images/${aboutHeroSrc}`}
        w={{ base: '100%', sm: '80%', md: '60%', lg: '43%' }}
        m="40"
      />
    </HStack>
  )
}

export default AboutHero
