import React from 'react'
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
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
      spacing={{ lg: '25%', base: 0, md: '10%', '2xl': '29%' }}
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box mb={{ base: 10, lg: 0 }}>
        <Heading
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          mt={10}
          mb={{ base: 5, lg: 10 }}
        >{`${t('aboutHeroHeading')}`}</Heading>
        <Text
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          opacity={0.6}
        >{`${t('aboutHeroPhrase')}`}</Text>
        <Box textAlign={{ base: 'center', lg: 'left' }}>
          <ButtonGroup
            mx="auto"
            mt={{ base: 10, lg: 4, md: 10 }}
            size="lg"
            spacing={{ base: 4, lg: 8 }}
          >
            <LinkButton href="/user/profile" w={{ base: 32, lg: 40 }}>
              {`${t('aboutSignUpBttn')}`}
            </LinkButton>
            <LinkButton href="/iq" w={{ base: 32, lg: 40 }} variant="outline">
              {`${t('aboutgoTo')}`}
            </LinkButton>
          </ButtonGroup>
        </Box>
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
