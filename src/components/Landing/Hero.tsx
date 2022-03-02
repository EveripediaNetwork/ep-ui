import React from 'react'
import { Avatar, ButtonGroup, chakra, Flex, Image } from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'
import { featuredArticle } from '@/data/FeaturesArticleData'

const HeroCard = () => {
  const { image, avatarImage, username, title } = featuredArticle

  return (
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
      <Image
        src={image}
        alt={title}
        fit="cover"
        bg="gray.100"
        loading="lazy"
        roundedTop="lg"
        h={{ base: 80, lg: 'sm' }}
      />
      <Flex p="3" align="center" gap={4}>
        <Avatar boxSize={10} src={avatarImage} />
        <Flex direction="column" justify="space-between" fontWeight="semibold">
          <chakra.span>{title}</chakra.span>
          <chakra.span color="blue">{username}</chakra.span>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const Hero = () => (
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
          <LinkButton href="/create" w={{ base: 32, lg: 40 }} variant="outline">
            Create
          </LinkButton>
        </ButtonGroup>
      </Flex>
      <HeroCard />
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
