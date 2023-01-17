import {
  Text,
  chakra,
  Box,
  AspectRatio,
  Flex,
  HStack,
  VStack,
  Icon,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { RiCalendarLine } from 'react-icons/ri'
import router from 'next/router'
import shortenAccount from '@/utils/shortenAccount'
import { IconType } from 'react-icons/lib'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Link } from '../Elements'

const TrendingCard = ({
  wikis = [],
  title,
  icon,
}: {
  wikis?: Wiki[]
  title: string
  icon: IconType
}) => {
  return (
    <Flex
      py="1"
      minH="420px"
      maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
    >
      <Box
        w="full"
        rounded="lg"
        shadow="lg"
        py={3}
        bg="white"
        _dark={{ bgColor: 'gray.700', color: 'white' }}
      >
        <chakra.div w="full" alignItems="center" display="flex" pl="2">
          <Icon cursor="pointer" fontSize="2xl" fontWeight={600} as={icon} />
          <Text fontSize={{ base: 'md', lg: '18px' }} pl={2} fontWeight="600">
            {title}
          </Text>
        </chakra.div>
        <VStack w="full" pt="2" px="2">
          {wikis.map((wiki, i) => (
            <HStack w="full" pt="3" pb="2">
              <chakra.span minW="2" alignSelf="flex-start">
                {' '}
                {i + 1}
              </chakra.span>
              <HStack>
                <Link href={`/wiki/${wiki.id}`}>
                  <AspectRatio
                    ratio={6 / 5}
                    w={{
                      base: '100px',
                      md: '100px',
                      lg: '114px',
                    }}
                  >
                    <Image
                      src={getWikiImageUrl(wiki.images)}
                      alt={wiki.title}
                      borderRadius="md"
                    />
                  </AspectRatio>
                </Link>
                <Flex
                  direction="column"
                  justifyContent="flex-start"
                  textAlign="start"
                  gap="1"
                >
                  <Text
                    fontWeight="thin"
                    cursor="pointer"
                    color="brandLinkColor"
                    fontSize={{
                      base: '14px',
                      md: '18px',
                    }}
                    overflow="hidden"
                    onClick={() => router.push(`wiki/${wiki.id}`)}
                  >
                    {wiki.title}
                  </Text>

                  <Text
                    display={{ base: 'none', md: '-webkit-box' }}
                    noOfLines={2}
                    w="97%"
                    lineHeight="6"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    fontSize={{
                      base: '12px',
                      md: '14px',
                    }}
                    fontWeight="thin"
                  >
                    {wiki.summary}
                  </Text>

                  <HStack
                    w="97%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Flex w="45%" gap="1" alignItems="center">
                      <DisplayAvatar
                        address={wiki.user.id}
                        avatarIPFS={wiki.user.profile?.avatar}
                        size={20}
                        alt={wiki.user.profile?.username}
                      />
                      <Link
                        href={`/account/${wiki?.user?.id}`}
                        color="brandLinkColor"
                        fontSize="11px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {shortenAccount(wiki.user.id)}
                      </Link>
                    </Flex>

                    {wiki.updated && (
                      <Flex w="55%" alignItems="center">
                        <Icon
                          cursor="pointer"
                          fontSize="lg"
                          fontWeight={600}
                          as={RiCalendarLine}
                        />

                        <Text
                          fontSize={{
                            base: '10px',
                            md: '11px',
                          }}
                          ml="1px"
                          mt="1px"
                          whiteSpace="nowrap"
                        >
                          {wiki.updated
                            ? new Date(wiki.updated).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                },
                              )
                            : '-'}
                        </Text>
                      </Flex>
                    )}
                  </HStack>
                </Flex>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  )
}
export default TrendingCard
