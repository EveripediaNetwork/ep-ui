import { useENSData } from '@/hooks/useENSData'
import React from 'react'
import NextLink from 'next/link'
import { Flex, Text, chakra, Link, Box } from '@chakra-ui/react'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { Wiki } from '@/types/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getUsername } from '@/utils/getUsername'
import { WikiImage } from '../WikiImage'
import DisplayAvatar from '../Elements/Avatar/Avatar'

const CARD_DETAILS_LENGTH = 50

export const HeroCard = ({ wiki }: { wiki: Wiki | undefined }) => {
  const [userEnsDomain] = useENSData(wiki?.user?.id)

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
          imgH="320"
          imgW="450"
          borderRadius="none"
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
                <DisplayAvatar
                  size="20"
                  address={wiki?.user.id}
                  avatarIPFS={wiki?.user.profile?.avatar}
                />
              </Box>
            </NextLink>
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${wiki?.user?.id}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {getUsername(wiki?.user, userEnsDomain)}
                </Link>
              </NextLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  )
}
