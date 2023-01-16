import {
  Text,
  chakra,
  Heading,
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
import { useTranslation } from 'react-i18next'
import {
  RiBarChartFill,
  RiCalendarLine,
  RiTimeFill,
  RiFireFill,
} from 'react-icons/ri'
import router from 'next/router'
import shortenAccount from '@/utils/shortenAccount'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Carousel, Link } from '../Elements'

const TrendingWikis = ({ drops = [] }: { drops?: Wiki[] }) => {
  const { t } = useTranslation()

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      py={{ base: 5, md: 20 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('trendingWikis')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        px={4}
        maxW="750"
      >{`${t('trendingWikisDescription')}`}</Text>

      <Flex
        alignItems="center"
        justifyContent="center"
        maxW="1208px"
        mx="auto"
        flexWrap="wrap"
        gap={2}
      >
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
              <Icon
                cursor="pointer"
                fontSize="2xl"
                fontWeight={600}
                as={RiBarChartFill}
              />
              <Text
                fontSize={{ base: 'md', lg: '18px' }}
                pl={2}
                fontWeight="600"
              >
                Trending Wikis
              </Text>
            </chakra.div>
            <VStack w="full" pt="2" px="2">
              {drops.map((wiki, i) => (
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
                          base: '90px',
                          md: '80px',
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
                          md: '16px',
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
                        lineHeight="5"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        fontSize={{
                          base: '10px',
                          md: '12px',
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
                                md: '12px',
                              }}
                              ml="1px"
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
        <Flex
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
          py="1"
          minH="420px"
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
              <Icon
                cursor="pointer"
                fontSize="2xl"
                fontWeight={600}
                as={RiTimeFill}
              />
              <Text
                fontSize={{ base: 'md', lg: '18px' }}
                pl={2}
                fontWeight="600"
              >
                Recent Edits
              </Text>
            </chakra.div>
            <VStack w="full" pt="2" px="2">
              {drops.map((wiki, i) => (
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
                          base: '90px',
                          md: '80px',
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
                          md: '16px',
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
                        lineHeight="5"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        fontSize={{
                          base: '10px',
                          md: '12px',
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
                                md: '12px',
                              }}
                              ml="1px"
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
        <Flex
          py="1"
          minH="420px"
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
        >
          <Box
            w="full"
            shadow="lg"
            rounded="lg"
            py={3}
            bg="white"
            _dark={{ bgColor: 'gray.700', color: 'white' }}
            color="black"
            textAlign="center"
            justifyContent="center"
          >
            <chakra.div w="full" alignItems="center" display="flex" pl="2">
              <Icon
                cursor="pointer"
                fontSize="2xl"
                fontWeight={600}
                as={RiFireFill}
              />
              <Text
                fontSize={{ base: 'md', lg: '18px' }}
                pl={2}
                fontWeight="600"
              >
                New
              </Text>
            </chakra.div>
            <Carousel
              topArrow="25%"
              settings={{
                dots: true,
                infinite: false,
                arrows: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,

                responsive: [
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      initialSlide: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 680,
                    settings: {
                      arrows: false,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                ],
              }}
            >
              {drops.map(wiki => (
                <VStack py="3" px="3" pt="3" w="full">
                  <Link href={`/wiki/${wiki.id}`}>
                    <Flex w="full" alignItems="center" justifyContent="center">
                      <AspectRatio ratio={7 / 3} w="90%">
                        <Image
                          src={getWikiImageUrl(wiki.images)}
                          alt={wiki.title}
                          borderRadius="md"
                        />
                      </AspectRatio>
                    </Flex>
                  </Link>
                  <Text
                    cursor="pointer"
                    color="brandLinkColor"
                    fontSize={{
                      base: '16px',
                      md: '20px',
                    }}
                    overflow="hidden"
                    onClick={() => router.push(`wiki/${wiki.id}`)}
                  >
                    {wiki.title}
                  </Text>
                  <Text
                    display={{ base: 'none', md: '-webkit-box' }}
                    noOfLines={2}
                    w="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    fontSize={{
                      base: '12px',
                      md: '12px',
                    }}
                    color="gray.700"
                    _dark={{ bgColor: 'gray.700', color: 'white' }}
                    fontWeight="thin"
                  >
                    {wiki.summary}
                  </Text>
                  <Flex
                    w="full"
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    pb="2"
                    gap="4"
                  >
                    <Box
                      w="full"
                      rounded="lg"
                      bg="gray.200"
                      px="3"
                      py="3"
                      fontSize={{
                        base: '10px',
                        md: '12px',
                      }}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <Text>Created: </Text>
                        <HStack>
                          <Icon
                            cursor="pointer"
                            fontSize="xl"
                            fontWeight={600}
                            as={RiCalendarLine}
                          />
                          <Text>
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
                        </HStack>
                      </Flex>
                    </Box>
                    <Box
                      w="full"
                      rounded="lg"
                      bg="gray.200"
                      px="3"
                      py="3"
                      fontSize={{
                        base: '10px',
                        md: '12px',
                      }}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <Text>Created By: </Text>

                        <HStack>
                          <DisplayAvatar
                            address={wiki.user.id}
                            avatarIPFS={wiki.user.profile?.avatar}
                            size={20}
                            alt={wiki.user.profile?.username}
                          />
                          <Link
                            href={`/account/${wiki.user?.id}`}
                            color="brand.500 !important"
                            fontSize="12px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {shortenAccount(wiki.user?.id)}
                          </Link>
                        </HStack>
                      </Flex>
                    </Box>
                  </Flex>
                </VStack>
              ))}
            </Carousel>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default TrendingWikis
