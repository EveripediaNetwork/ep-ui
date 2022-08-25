import React from 'react'
import { ButtonGroup, Heading, Text, VStack, Stack } from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { useTranslation } from 'react-i18next'
import { Wiki } from '@/types/Wiki'
import { HeroCard } from './HeroCard'

const Hero = ({ wiki }: { wiki: Wiki | undefined }) => {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justify="center"
      w={{ base: 'full', lg: '90vw', xl: 'min(90%, 1100px)' }}
      mx="auto"
      px={{ base: 3, lg: 10 }}
    >
      <VStack
        alignItems={{ base: 'center', lg: 'start' }}
        textAlign={{ base: 'center', lg: 'start' }}
        spacing={4}
        mb={10}
        mt={5}
      >
        <Heading
          w={{ base: '80%', md: '100%' }}
          fontSize={{ base: '32', md: '54' }}
          fontWeight="700"
          lineHeight="1.1"
        >
          {`${t('hero_title')}`}
        </Heading>
        <Text
          w={{ base: '70%', md: '80%' }}
          fontSize={{ base: 'sm', md: 'md', lg: '2xl' }}
          pb={10}
          letterSpacing="wider"
        >
          {`${t('iq_description')}`}
        </Text>
        <ButtonGroup size="lg" spacing={{ base: 4, lg: 8 }}>
          <LinkButton href="/categories" w={{ base: 32, lg: 40 }}>
            {`${t('exploreHeroBttn')}`}
          </LinkButton>
          <LinkButton
            href="/create-wiki"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
          >
            {`${t('createHeroBttn')}`}
          </LinkButton>
        </ButtonGroup>
        <LinkButton href="/static/about" variant="link" color="brand.500">
          {`${t('learnMoreHeroBttn')}`}
        </LinkButton>
      </VStack>
      <HeroCard wiki={wiki} />
    </Stack>
  )
}

export default Hero
