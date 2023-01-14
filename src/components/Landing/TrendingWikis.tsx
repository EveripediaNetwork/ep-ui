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
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
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
        bg="white"
        flexWrap="wrap"
        gap={2}
      >
        <Flex
          px="2"
          py="1"
          minH="400px"
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
        >
          <Box
            w="full"
            shadow="lg"
            border="1px"
            rounded="lg"
            borderColor="gray.300"
            px={1}
            py={3}
          >
            <chakra.div w="full" alignItems="center" display="flex" pl="1">
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
            <VStack w="full" py="3" px="2">
              {drops.map((wiki, i) => (
                <HStack w="full" py="3">
                  <chakra.span minW="2" alignSelf="flex-start">
                    {' '}
                    {i + 1}
                  </chakra.span>
                  <HStack>
                    <Link href={`/wiki/${wiki.id}`}>
                      <AspectRatio
                        ratio={WIKI_IMAGE_ASPECT_RATIO}
                        w={{
                          base: '90px',
                          md: '80px',
                          lg: '90px',
                        }}
                      >
                        <WikiImage
                          cursor="pointer"
                          flexShrink={0}
                          imageURL={getWikiImageUrl(wiki.images)}
                          borderRadius="lg"
                          overflow="hidden"
                          alt={wiki.title}
                        />
                      </AspectRatio>
                    </Link>
                    <Flex
                      direction="column"
                      justifyContent="flex-start"
                      textAlign="start"
                    >
                      <Text
                        fontWeight="thin"
                        cursor="pointer"
                        color="brandLinkColor"
                        fontSize={{
                          base: '12px',
                          md: '14px',
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
                        <Flex w="45%" gap="1">
                          <DisplayAvatar
                            address={wiki.user.id}
                            avatarIPFS={wiki.user.profile?.avatar}
                            size={20}
                            alt={wiki.user.profile?.username}
                          />
                          <Link
                            href={`/account/${wiki?.user?.id}`}
                            color="brand.500 !important"
                            fontSize="12px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {shortenAccount(wiki.user.id)}
                          </Link>
                        </Flex>

                        {wiki.updated && (
                          <Flex w="55%">
                            <Icon
                              cursor="pointer"
                              fontSize="xl"
                              fontWeight={600}
                              as={RiCalendarLine}
                            />

                            <Text
                              mt="3px !important"
                              fontSize={{
                                base: '10px',
                                md: '12px',
                              }}
                              opacity={0.6}
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
          px="2"
          py="1"
          minH="400px"
        >
          <Box
            w="full"
            shadow="lg"
            border="1px"
            rounded="lg"
            borderColor="gray.300"
            px={1}
            py={3}
          >
            <chakra.div w="full" alignItems="center" display="flex" pl="1">
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
            <VStack w="full" py="3" px="2">
              {drops.map((wiki, i) => (
                <HStack w="full" py="3">
                  <chakra.span minW="2" alignSelf="flex-start">
                    {' '}
                    {i + 1}
                  </chakra.span>
                  <HStack>
                    <Link href={`/wiki/${wiki.id}`}>
                      <AspectRatio
                        ratio={WIKI_IMAGE_ASPECT_RATIO}
                        w={{
                          base: '90px',
                          md: '80px',
                          lg: '90px',
                        }}
                      >
                        <WikiImage
                          cursor="pointer"
                          flexShrink={0}
                          imageURL={getWikiImageUrl(wiki.images)}
                          borderRadius="lg"
                          overflow="hidden"
                          alt={wiki.title}
                        />
                      </AspectRatio>
                    </Link>
                    <Flex
                      direction="column"
                      justifyContent="flex-start"
                      textAlign="start"
                    >
                      <Text
                        fontWeight="thin"
                        cursor="pointer"
                        color="brandLinkColor"
                        fontSize={{
                          base: '12px',
                          md: '14px',
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
                        <Flex w="45%" gap="1">
                          <DisplayAvatar
                            address={wiki.user.id}
                            avatarIPFS={wiki.user.profile?.avatar}
                            size={20}
                            alt={wiki.user.profile?.username}
                          />
                          <Link
                            href={`/account/${wiki?.user?.id}`}
                            color="brand.500 !important"
                            fontSize="12px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {shortenAccount(wiki.user.id)}
                          </Link>
                        </Flex>

                        {wiki.updated && (
                          <Flex w="55%">
                            <Icon
                              cursor="pointer"
                              fontSize="xl"
                              fontWeight={600}
                              as={RiCalendarLine}
                            />

                            <Text
                              mt="3px !important"
                              fontSize={{
                                base: '10px',
                                md: '12px',
                              }}
                              opacity={0.6}
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
        <Box
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
          minH="400px"
        >
          <Box
            w="full"
            shadow="lg"
            border="1px"
            rounded="lg"
            borderColor="gray.300"
            px={1}
            py={3}
          >
            <chakra.div w="full" alignItems="center" display="flex" pl="1">
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
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2,
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
                <Box
                  maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
                  px="4"
                  pt="3"
                >
                  <Link href={`/wiki/${wiki.id}`}>
                    <AspectRatio
                      ratio={3 / 2}
                      w={{
                        base: '100px',
                        md: '150px',
                        lg: '180px',
                      }}
                      justifyContent="center"
                    >
                      <WikiImage
                        cursor="pointer"
                        flexShrink={0}
                        imageURL={getWikiImageUrl(wiki.images)}
                        borderRadius="lg"
                        overflow="hidden"
                        alt={wiki.title}
                      />
                    </AspectRatio>
                  </Link>
                  <Text
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
                    w="100%"
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
                  <Flex
                    w="full"
                    py="3"
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="5"
                  >
                    <Box
                      w="full"
                      rounded="lg"
                      bg="gray.200"
                      px="3"
                      py="2"
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
                      py="2"
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
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default TrendingWikis
