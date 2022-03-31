import React from 'react'
import { Avatar, ButtonGroup, chakra, Flex } from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { featuredArticle } from '@/data/FeaturesArticleData'
import { Wiki } from '@/types/Wiki'
import shortenAccount from '@/utils/shortenAccount'
import NextLink from 'next/link'
import { useEnsAvatar } from 'wagmi'
import { WikiImage } from '../WikiImage'

const HeroCard = ({ wiki }: HeroProps) => {
  const [{ data: avatar}] = useEnsAvatar({
    addressOrName: '0x9fEAB70f3c4a944B97b7565BAc4991dF5B7A69ff',
  })

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
        maxW={{ base: '90vw', md: '96', lg: 'xl' }}
        w="full"
      >
        {wiki && (
          <WikiImage
            cursor="pointer"
            flexShrink={0}
            wiki={wiki}
            h={{ base: '100%', lg: 400 }}
            w={{ base: '100%', lg: '100%' }}
            borderRadius="none"
            overflow="hidden"
          />
        )}
        <Flex p="3" align="center" gap={4}>
          <NextLink href={`/account/${wiki?.user?.id}`} passHref>
            <Avatar boxSize={10} src={avatar || undefined} />
          </NextLink>
          <Flex
            direction="column"
            justify="space-between"
            fontWeight="semibold"
          >
            <chakra.span>{wiki?.title}</chakra.span>
            <chakra.span color="blue">
              {shortenAccount(wiki?.user?.id || '')}
            </chakra.span>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}

export const Hero = ({ wiki }: HeroProps) => (
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
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '5xl' }}
          marginTop={{ md: '60px' }}
          fontWeight="bold"
          lineHeight="shorter"
          letterSpacing="wider"
        >
          An Ecosystem of Knowledge.
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize={{ base: 'sm', md: 'xl', lg: '2xl' }}
          letterSpacing="wider"
        >
          On the blockchain
        </chakra.p>

        <ButtonGroup size="lg" mt={{ lg: 10 }} spacing={{ base: 4, lg: 8 }}>
          <LinkButton href="/categories" w={{ base: 32, lg: 40 }}>
            Explore
          </LinkButton>
          <LinkButton
            href="/create-wiki"
            w={{ base: 32, lg: 40 }}
            variant="outline"
          >
            Create
          </LinkButton>
        </ButtonGroup>
      </Flex>
      <HeroCard wiki={wiki} />
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
      Learn more about Everipedia
    </LinkButton>
  </Flex>
)

interface HeroProps {
  wiki: Wiki | undefined
}
