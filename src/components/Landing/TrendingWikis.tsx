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
import { Link } from '../Elements'

// const TRENDING_WIKI_IMG_WIDTH = 300
// const TrendingWikiCard = ({ wiki }: { wiki: Wiki }) => {
//   const [, ensName] = useENSData(wiki.user.id)
//   const getLatestEdited = () => {
//     let lastEditedTime = null
//     if (wiki.updated) {
//       lastEditedTime = getReadableDate(wiki.updated)
//     } else if (wiki.created) {
//       lastEditedTime = getReadableDate(wiki.created)
//     }
//     return lastEditedTime
//   }

//   return (
//     <LinkBox flex="none">
//       <chakra.div p={2} mx="auto">
//         <Flex
//           alignSelf="center"
//           direction="column"
//           textAlign="left"
//           bg="white"
//           color="black"
//           _dark={{ bgColor: 'gray.700', color: 'white' }}
//           maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '388' }}
//           cursor="pointer"
//           rounded="lg"
//           shadow="md"
//           mx="auto"
//         >
//           <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>
//             <WikiImage
//               cursor="pointer"
//               flexShrink={0}
//               imageURL={getWikiImageUrl(wiki.images)}
//               borderRadius="none"
//               roundedTop="lg"
//               alt={wiki.title}
//               imgH={TRENDING_WIKI_IMG_WIDTH}
//               imgW={WIKI_IMAGE_ASPECT_RATIO * TRENDING_WIKI_IMG_WIDTH}
//             />
//           </AspectRatio>
//           <Flex
//             direction="column"
//             justify="space-between"
//             fontWeight="semibold"
//             p={4}
//           >
//             <LinkOverlay href={`/wiki/${wiki?.id}`}>
//               <Heading
//                 width="90%"
//                 overflow="hidden"
//                 textOverflow="ellipsis"
//                 whiteSpace="nowrap"
//                 fontSize={24}
//               >
//                 {wiki?.title}
//               </Heading>
//             </LinkOverlay>
//             <Text
//               fontSize="sm"
//               maxW="90%"
//               minH={12}
//               color="homeDescriptionColor"
//               my={2}
//             >
//               {wiki && getWikiSummary(wiki, WikiSummarySize.Small)}
//             </Text>

//             <HStack justify="space-between">
//               <Flex alignItems="center" gap={3} width="50%">
//                 <Link href={`/account/${wiki?.user?.id}`}>
//                   <DisplayAvatar
//                     alt={getUsername(wiki?.user, ensName)}
//                     size={20}
//                     address={wiki?.user.id}
//                     avatarIPFS={wiki?.user.profile?.avatar}
//                   />
//                 </Link>
//                 <Link
//                   href={`/account/${wiki?.user?.id}`}
//                   color="brand.500 !important"
//                   fontSize="sm"
//                   overflow="hidden"
//                   textOverflow="ellipsis"
//                   whiteSpace="nowrap"
//                 >
//                   {getUsername(wiki?.user, ensName)}
//                 </Link>
//               </Flex>
//               <Text
//                 width="50%"
//                 whiteSpace="nowrap"
//                 overflow="hidden"
//                 textOverflow="ellipsis"
//                 color="gray.400"
//                 _dark={{
//                   color: 'whiteAlpha.900',
//                 }}
//                 fontWeight="400"
//                 fontSize="sm"
//                 textAlign="right"
//               >
//                 Last Edited {getLatestEdited()}
//               </Text>
//             </HStack>
//           </Flex>
//         </Flex>
//       </chakra.div>
//     </LinkBox>
//   )
// }

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
        maxW="1217px"
        mx="auto"
        bg="white"
        wrap="wrap"
        gap={2}
      >
        <Flex w="400px" px="2" py="1" minH="400px">
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

                      <Flex
                        w="97%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <HStack>
                          <DisplayAvatar
                            address={wiki.user.id}
                            avatarIPFS={wiki.user.profile?.avatar}
                            size={20}
                            alt={wiki.user.profile?.username}
                          />
                          <Link href={`/account/${wiki.user.id}`}>
                            <Text color="brandLinkColor" fontSize="12px">
                              {shortenAccount(wiki.user.id)}
                            </Text>
                          </Link>
                        </HStack>

                        {wiki.updated && (
                          <HStack>
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
                          </HStack>
                        )}
                      </Flex>
                    </Flex>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Flex>
        <Flex w="400px" px="2" py="1" minH="400px">
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

                      <Flex
                        w="97%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <HStack>
                          <DisplayAvatar
                            address={wiki.user.id}
                            avatarIPFS={wiki.user.profile?.avatar}
                            size={20}
                            alt={wiki.user.profile?.username}
                          />
                          <Link href={`/account/${wiki.user.id}`}>
                            <Text color="brandLinkColor" fontSize="12px">
                              {shortenAccount(wiki.user.id)}
                            </Text>
                          </Link>
                        </HStack>

                        {wiki.updated && (
                          <HStack justifyContent="flex-end">
                            <Icon
                              cursor="pointer"
                              fontSize="xl"
                              fontWeight={600}
                              as={RiCalendarLine}
                              pl="1"
                            />

                            <Text
                              fontSize={{
                                base: '10px',
                                md: '12px',
                              }}
                              p="0"
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
                          </HStack>
                        )}
                      </Flex>
                    </Flex>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Flex>
        <Flex w="400px" px="2" py="1" minH="400px">
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
            <VStack w="full" px="4" pt="3">
              <Link href={`/wiki/${drops[0].id}`}>
                <AspectRatio
                  ratio={3 / 2}
                  w={{
                    base: '100px',
                    md: '150px',
                    lg: '180px',
                  }}
                >
                  <WikiImage
                    cursor="pointer"
                    flexShrink={0}
                    imageURL={getWikiImageUrl(drops[0].images)}
                    borderRadius="lg"
                    overflow="hidden"
                    alt={drops[0].title}
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
                onClick={() => router.push(`wiki/${drops[0].id}`)}
              >
                {drops[0].title}
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
                {drops[0].summary}
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
                        {drops[0].updated
                          ? new Date(drops[0].updated).toLocaleDateString(
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
                        address={drops[0].user.id}
                        avatarIPFS={drops[0].user.profile?.avatar}
                        size={20}
                        alt={drops[0].user.profile?.username}
                      />
                      <Link href={`/account/${drops[0].user.id}`}>
                        <Text color="brandLinkColor" fontSize="12px">
                          {shortenAccount(drops[0].user.id)}
                        </Text>
                      </Link>
                    </HStack>
                  </Flex>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </Flex>

        {/* <Carousel
          topArrow="25%"
          settings={{
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,

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
            <TrendingWikiCard key={`wiki-${wiki.id}`} wiki={wiki} />
          ))}
        </Carousel> */}
      </Flex>
    </Box>
  )
}

export default TrendingWikis
