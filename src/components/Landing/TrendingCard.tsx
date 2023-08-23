import {
  Text,
  Box,
  AspectRatio,
  Flex,
  HStack,
  Icon,
  Select,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import router from 'next/router'
import { IconType } from 'react-icons/lib'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { shortenText } from '@/utils/textUtils'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { TrendingData } from '@/types/Home'
import { Link } from '../Elements'
import { TrendingSkeleton } from './LoadingFeaturedWikiCard'
import { Image } from '../Elements/Image/Image'

const TrendingCard = ({
  wikis = [],
  title,
  icon,
  isTrending,
}: {
  wikis?: Wiki[] | TrendingData
  title: string
  icon: IconType
  isTrending?: boolean
}) => {
  const [wikiData, setWikiData] = React.useState<Wiki[] | undefined>(
    isTrending ? (wikis as TrendingData).todayTrending : (wikis as Wiki[]),
  )

  return (
    <Flex py="1" maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}>
      <Box
        w="full"
        rounded="lg"
        border="1px solid"
        borderColor={'gray.100'}
        minH="500px"
        py={5}
        bg="white"
        _dark={{ bgColor: 'gray.700', border: 'none' }}
      >
        <Flex
          w="full"
          alignItems="center"
          pl="2"
          mb="2"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Icon
              cursor="pointer"
              fontSize="2xl"
              fontWeight={600}
              color="brandLinkColor"
              as={icon}
            />
            <Text
              color={'wikiFlagTextColor'}
              fontSize={{ base: 'md', lg: '18px' }}
              pl={2}
              fontWeight="600"
            >
              {title}
            </Text>
          </Flex>
          {isTrending && (
            <Select
              h="30px"
              fontSize="12px"
              w="120px"
              icon={<ChevronDownIcon />}
              mr="2"
              borderColor="rankingListBorder"
              onChange={(e) => {
                setWikiData(
                  (wikis as TrendingData)[e.target.value as keyof TrendingData],
                )
              }}
            >
              <option value="todayTrending">Today</option>
              <option value="weekTrending">Last Week</option>
              <option value="monthTrending">Last Month</option>
            </Select>
          )}
        </Flex>
        {wikis ? (
          <Flex direction={'column'} w="full" px="1" overflow="hidden">
            {wikiData?.map((wiki, i) => (
              <HStack
                w="full"
                _hover={{
                  borderRadius: 'md',
                  bgColor: 'gray.100',
                  _dark: {
                    bgColor: 'whiteAlpha.100',
                  },
                }}
                cursor="pointer"
                mt={0}
                key={i}
                py={2}
                px={2}
              >
                <HStack>
                  <Link href={`/wiki/${wiki.id}`}>
                    <AspectRatio
                      ratio={WIKI_IMAGE_ASPECT_RATIO}
                      w={{
                        base: '50px',
                        md: '60px',
                        lg: '70px',
                      }}
                    >
                      <Image
                        src={getWikiImageUrl(wiki.images)}
                        alt={wiki.title}
                        borderRadius="md"
                        overflow="hidden"
                        imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
                        imgH={IMAGE_BOX_SIZE}
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
                      color="wikiFlagTextColor"
                      fontSize="18px"
                      overflow="hidden"
                      onClick={() => router.push(`wiki/${wiki.id}`)}
                    >
                      {shortenText(wiki.title, 24)}
                    </Text>
                    <Text
                      display={{ base: 'none', md: '-webkit-box' }}
                      noOfLines={2}
                      w="97%"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      fontSize="12px"
                      fontWeight="thin"
                      color="homeDescriptionColor"
                    >
                      {wiki.summary}
                    </Text>
                  </Flex>
                </HStack>
              </HStack>
            ))}
          </Flex>
        ) : (
          <TrendingSkeleton />
        )}
      </Box>
    </Flex>
  )
}
export default TrendingCard
