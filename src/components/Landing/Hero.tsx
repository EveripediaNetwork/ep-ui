import React from 'react'
import {
  Avatar,
  Box,
  ButtonGroup,
  chakra,
  Flex,
  LinkBox,
  LinkOverlay,
  Skeleton,
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
import { StaticContent } from '@/components/StaticElement'
import { WikiImage } from '../WikiImage'

const HeroCard = ({ wiki }: HeroProps) => {
  const [avatar, username] = useENSData(wiki?.user?.id)

  return (
    <LinkBox
      display="flex"
      alignSelf="center"
      flexDirection="column"
      shadow="lg"
      rounded="lg"
      bg="white"
      color="black"
      cursor="pointer"
      _hover={{ shadow: '2xl' }}
      maxW={{ base: '90vw', md: '96', lg: 'xl' }}
      w="full"
    >
      <WikiImage
        cursor="pointer"
        flexShrink={0}
        imageURL={getWikiImageUrl(wiki)}
        h={{ base: 80, lg: 400 }}
        w={{ base: '100%', lg: '100%' }}
        borderRadius="none"
        roundedTop="lg"
        overflow="hidden"
      />
      <Flex p="3" align="center" gap={4}>
        <Box>
          {avatar ? (
            <Avatar size="xs" src={avatar} />
          ) : (
            <CustomAvatar
              size="25"
              variant="pixel"
              name="Unnamed"
              colors={AvatarColorArray}
            />
          )}
        </Box>
        <Flex direction="column" justify="space-between" fontWeight="semibold">
          <NextLink href={`/wiki/${wiki?.id}`} passHref>
            <LinkOverlay>{wiki?.title}</LinkOverlay>
          </NextLink>

          <NextLink href={`/account/${wiki?.user?.id}`} passHref>
            <chakra.a color="blue">
              {username || shortenAccount(wiki?.user?.id || '')}
            </chakra.a>
          </NextLink>
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export const Hero = ({ wiki }: HeroProps) => {
  const { t } = useTranslation()

  return (
    <StaticContent>
      <Flex pos="relative" direction="column">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          columnGap={{ base: 8, xl: 20 }}
          rowGap={{ base: 14, lg: 0 }}
        >
          <Flex
            direction="column"
            alignItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'start' }}
            pt="10"
            mx="auto"
            maxW={{ base: 'lg', lg: '4xl' }}
          >
            <chakra.h1
              mb={6}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '4xl' }}
              marginTop={{ md: '60px' }}
              fontWeight="bold"
              lineHeight="shorter"
              letterSpacing="wider"
            >
              {`${t('hero_title')}`}
            </chakra.h1>
            <chakra.p
              pr={{ base: 0, lg: 16 }}
              mb={4}
              fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
              letterSpacing="wider"
            >
              {`${t('iq_description')}`}
            </chakra.p>

            <ButtonGroup size="lg" mt={{ lg: 10 }} spacing={{ base: 4, lg: 8 }}>
              <LinkButton href="/categories" w={{ base: 32, lg: 40 }}>
                {`${t('exploreHeroBttn')}`}
              </LinkButton>
              <LinkButton
                href="/create-wiki"
                w={{ base: 32, lg: 40 }}
                variant="outline"
              >
                {`${t('createHeroBttn')}`}
              </LinkButton>
            </ButtonGroup>
          </Flex>
          {wiki ? (
            <HeroCard wiki={wiki} />
          ) : (
            <Skeleton
              h={{ base: 80, lg: 400 }}
              width="full"
              maxW={{ base: '90vw', md: '96', lg: '2xl' }}
              borderRadius="none"
              roundedTop="lg"
            />
          )}
        </Flex>
        <LinkButton
          href="/static/about"
          mx="auto"
          variant="link"
          mt={{ base: 12, lg: 0 }}
          color="blue.300"
          pos={{ lg: 'absolute' }}
          bottom={{ lg: 0 }}
        >
          {`${t('learnMoreHeroBttn')}`}
        </LinkButton>
      </Flex>
    </StaticContent>
  )
}

interface HeroProps {
  wiki: Wiki | undefined
}
