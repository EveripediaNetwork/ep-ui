import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  ButtonGroup,
  Heading,
  chakra,
  Flex,
  Text,
  VStack,
  Stack,
  Link,
} from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { Wiki } from '@/types/Wiki'
import shortenAccount from '@/utils/shortenAccount'
import NextLink from 'next/link'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'
import { useENSData } from '@/hooks/useENSData'
import CustomAvatar from 'boring-avatars'
import { AvatarColorArray } from '@/data/AvatarData'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { WikiImage } from '../WikiImage'

const CARD_DETAILS_LENGTH = 50
const HeroCard = ({ wiki }: HeroProps) => {
  const [avatar, username] = useENSData(wiki?.user?.id)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <NextLink href={`/wiki/${wiki?.id}`} passHref>
      <Flex
        alignSelf="center"
        direction="column"
        shadow="lg"
        rounded="lg"
        bg="white"
        color="black"
        cursor="pointer"
        _hover={{ shadow: '2xl' }}
        maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '418' }}
        w="full"
      >
        <WikiImage
          cursor="pointer"
          flexShrink={0}
          imageURL={getWikiImageUrl(wiki)}
          h={{ base: 80, lg: 320 }}
          w={{ base: '100%', lg: '100%' }}
          borderRadius="none"
          overflow="hidden"
          roundedTop="lg"
        />
        <Flex
          direction="column"
          justify="space-between"
          fontWeight="semibold"
          p={4}
        >
          <chakra.span>{wiki?.title}</chakra.span>
          <Text fontSize="xs" fontWeight="light" my={2}>
            {wiki && getWikiSummary(wiki, CARD_DETAILS_LENGTH)}
          </Text>

          <Flex gap={3}>
            <NextLink href={`/account/${wiki?.user?.id}`} passHref>
              <Box>
                {avatar ? (
                  <Avatar size="xs" src={avatar} />
                ) : (
                  <CustomAvatar
                    size="20"
                    variant="pixel"
                    name="Unnamed"
                    colors={AvatarColorArray}
                  />
                )}
              </Box>
            </NextLink>
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${wiki?.user?.id}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {username || shortenAccount(wiki?.user?.id || '')}
                </Link>
              </NextLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}

export const Hero = ({ wiki }: HeroProps) => {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justify="center"
      w={{ base: 'full', lg: '90vw', xl: 'min(90%, 1150px)' }}
      mx="auto"
      px={{ base: 6, lg: 0 }}
    >
      <VStack
        alignItems={{ base: 'center', lg: 'start' }}
        textAlign={{ base: 'center', lg: 'start' }}
        spacing={10}
        my={10}
      >
        <Heading
          w="70%"
          fontSize={{ base: '2xl', sm: '30', md: '44' }}
          fontWeight="black"
          lineHeight="normal"
          letterSpacing="wider"
        >
          {`${t('hero_title')}`}
        </Heading>
        <Text
          w="60%"
          fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
          letterSpacing="wider"
        >
          {`${t('iq_description')}`}
        </Text>
        <ButtonGroup size="lg" mt={{ lg: 10 }} spacing={{ base: 4, lg: 8 }}>
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
        <LinkButton href="/static/about" variant="link" color="blue.300">
          {`${t('learnMoreHeroBttn')}`}
        </LinkButton>
      </VStack>
      <HeroCard wiki={wiki} />
    </Stack>
  )
}

interface HeroProps {
  wiki: Wiki | undefined
}
