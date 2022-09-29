import React from 'react'
import {
  ButtonGroup,
  Heading,
  Text,
  VStack,
  Stack,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { useTranslation } from 'react-i18next'
import { Wiki } from '@/types/Wiki'
import { HeroCard } from './HeroCard'

const Hero = ({ wiki }: { wiki: Wiki | undefined }) => {
  const { t } = useTranslation()
  const description = useBreakpointValue({
    base: t('iq_descriptionShort'),
    md: t('iq_description'),
  })
  const middleHeroText = useBreakpointValue({
    base: 'Blockchain',
    md: 'Blockchain & Crypto',
  })

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justify="space-between"
      w={{ base: 'full', lg: '90vw', xl: 'min(90%, 1150px)' }}
      mx="auto"
      px={{ base: 3, lg: 10 }}
      mt={{ base: 4, lg: 0 }}
    >
      <VStack
        alignItems={{ base: 'center', lg: 'start' }}
        textAlign={{ base: 'center', lg: 'start' }}
        spacing={4}
        mb={10}
        mt={5}
      >
        <Heading
          w={{ base: '90%', md: '100%' }}
          fontSize={{ base: '35', sm: '42', lg: '54' }}
        >
          The World&apos;s Largest
          <br />
          <chakra.span color="brandLinkColor">{middleHeroText}</chakra.span>
          <br />
          Encyclopedia
        </Heading>
        <Text
          w={{ base: '70%', md: '75%', xl: '80%' }}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          pb={10}
        >
          {description}
        </Text>
        <ButtonGroup size="lg" spacing={{ base: 4, lg: 8 }}>
          <LinkButton href="/categories" w={{ base: 32, lg: 40 }}>
            {`${t('exploreHeroBttn')}`}
          </LinkButton>
          <LinkButton
            href="/static/about"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            {`${t('learnMoreHeroBttn')}`}
          </LinkButton>
        </ButtonGroup>
      </VStack>
      <HeroCard wiki={wiki} />
    </Stack>
  )
}

export default Hero
