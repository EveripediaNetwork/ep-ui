import React from 'react'
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { useTranslation } from 'react-i18next'

const AboutHero = () => {
  const { t } = useTranslation()
  return (
    <HStack
      mx="auto"
      maxW={{ base: '100%', lg: '70%' }}
      spacing={8}
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
    >
      <Box pr="32" m="0">
        <Heading mb={4}>{`${t('aboutHeroHeading')}`}</Heading>
        <Text opacity={0.6}>{`${t('aboutHeroPhrase')}`}</Text>
        <ButtonGroup size="lg" mt={4} spacing={{ base: 4, lg: 8 }}>
          <LinkButton href="/user/profile" w={{ base: 32, lg: 40 }}>
            {`${t('aboutSignUpBttn')}`}
          </LinkButton>
          <LinkButton href="/iq" w={{ base: 32, lg: 40 }} variant="outline">
            {`${t('aboutgoTo')}`}
          </LinkButton>
        </ButtonGroup>
      </Box>
      <Image
        flex={1}
        src="/images/about-everipedia.svg"
        w={{ base: '100%', sm: '80%', md: '60%', lg: '50%' }}
      />
    </HStack>
  )
}

export default AboutHero
