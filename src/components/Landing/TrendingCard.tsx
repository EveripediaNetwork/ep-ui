import {
  Text,
  chakra,
  Box,
  AspectRatio,
  Flex,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import router from 'next/router'
import { IconType } from 'react-icons/lib'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { shortenText } from '@/utils/shortenText'
import { Link } from '../Elements'
import { TrendingSkeleton } from './LoadingFeaturedWikiCard'
import { Image } from '../Elements/Image/Image'

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
    <Flex py="1" maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}>
      <Box
        w="full"
        rounded="lg"
        shadow="lg"
        minH="500px"
        py={3}
        bg="white"
        _dark={{ bgColor: 'gray.700', color: 'white' }}
      >
        <chakra.div w="full" alignItems="center" display="flex" pl="2">
          <Icon
            cursor="pointer"
            fontSize="2xl"
            fontWeight={600}
            color="brandLinkColor"
            as={icon}
          />
          <Text fontSize={{ base: 'md', lg: '18px' }} pl={2} fontWeight="600">
            {title}
          </Text>
        </chakra.div>
        {wikis ? (
          <VStack w="full" pt="2" px="2" gap="4" overflow="hidden">
            {wikis.map((wiki, i) => (
              <HStack w="full" key={i}>
                <chakra.span minW="2" alignSelf="center">
                  {' '}
                  {i + 1}
                </chakra.span>
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
                      cursor="pointer"
                      color="black"
                      _dark={{ color: 'white' }}
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
                    >
                      {wiki.summary}
                    </Text>
                  </Flex>
                </HStack>
              </HStack>
            ))}
          </VStack>
        ) : (
          <TrendingSkeleton />
        )}
      </Box>
    </Flex>
  )
}
export default TrendingCard
