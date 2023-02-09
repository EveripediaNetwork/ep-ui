import React from 'react'
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  Text,
} from '@chakra-ui/react'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
// import { getUsername } from '@/utils/DataTransform/getUsername'
// import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { Image } from '../Elements/Image/Image'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'

const TrendingCategoryItem = () => {
  return (
    <LinkBox
      bgColor="cardBg"
      border="1px solid white"
      borderRadius="12px"
      shadow="md"
    >
      <Flex gap="5">
        <Box>
          <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="226px" h="200px">
            <Image
              src="/images/defaults/og-image-default.png"
              imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
              imgH={IMAGE_BOX_SIZE}
              alt="trending wiki image"
              w="full"
              h="full"
              borderRadius="6px"
            />
          </AspectRatio>
        </Box>
        <Box flexGrow="1" alignSelf="center" pr="2">
          <Heading
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize={{
              base: '16px',
              md: '24px',
            }}
          >
            Bomb Crypto
          </Heading>
          <Text
            noOfLines={3}
            color="homeDescriptionColor"
            my={2}
            display="-webkit-box"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={{
              base: '14px',
              md: '15px',
            }}
          >
            Bomb Crypto is a Play-to-Earn NFT game, where players manage a group
            of bomber heroes...
          </Text>
          <Flex mt="2.5" gap="3">
            <DisplayAvatar address="" avatarIPFS="" size={20} alt="" />
            <Text fontSize="14px" color="linkColor">
              <Link
                href="/account/lol"
                color="brandLinkColor"
                fontWeight="bold"
              >
                0x1dfC...b1a9
              </Link>
            </Text>
          </Flex>
          <Text
            mt="4px !important"
            fontSize="14px"
            opacity={0.6}
            whiteSpace="nowrap"
          >
            Last Edited 12 days ago
          </Text>
        </Box>
      </Flex>
    </LinkBox>
  )
}

export default TrendingCategoryItem
