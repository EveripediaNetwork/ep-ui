import React from 'react'
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  LinkBox,
  Text,
} from '@chakra-ui/react'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { getUsername } from '@/utils/DataTransform/getUsername'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { Image } from '../Elements/Image/Image'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import Link from '@/components/Elements/LinkElements/Link'
import { TrendingCategoryItemProps } from '@/types/CategoryDataTypes'
import { useTranslatedTimestamps } from '@/hooks/useTranslatedTimestamps'
import { useAppSelector } from '@/store/hook'

const TrendingCategoryItem = (props: TrendingCategoryItemProps) => {
  const { wikiId, title, WikiImgObj, brief, editor, lastModTimeStamp } = props
  const lang = useAppSelector((state) => state.app.language)
  const translatedTimestamp = useTranslatedTimestamps(
    'Edited',
    lang,
    lastModTimeStamp ?? '',
  )
  return (
    <LinkBox bgColor="cardBg" borderRadius="12px">
      <Flex gap={{ base: 2, md: '5' }}>
        <Box alignSelf={{ base: 'center', md: 'initial' }}>
          <AspectRatio
            ratio={WIKI_IMAGE_ASPECT_RATIO}
            w={{ base: '149px', md: '226px' }}
            h={{ base: '124', md: '200px' }}
          >
            <Image
              src={getWikiImageUrl(WikiImgObj)}
              imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
              imgH={IMAGE_BOX_SIZE}
              alt="trending wiki image"
              w="full"
              h="full"
              borderRadius="6px"
              objectFit="cover"
            />
          </AspectRatio>
        </Box>
        <Box overflow="hidden" flexGrow="1" alignSelf="center">
          <LinkOverlay href={`/wiki/${wikiId}`}>
            <Heading
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              cursor="pointer"
              maxW="90%"
              fontSize={{
                base: '16px',
                md: '20px',
                lg: '24px',
              }}
              textTransform={'capitalize'}
              fontWeight={'600'}
            >
              {title}
            </Heading>
          </LinkOverlay>
          <Text
            noOfLines={{ base: 2, md: 3 }}
            color="homeDescriptionColor"
            my={2}
            display="-webkit-box"
            textOverflow="ellipsis"
            fontSize={{
              base: '12px',
              md: '14px',
            }}
          >
            {brief}
          </Text>
          <Flex mt="2.5" gap="3" alignItems="center">
            <DisplayAvatar
              address={editor.id}
              avatarIPFS={editor.profile?.avatar}
              alt={editor.profile?.username}
            />
            <Link href={`/account/${editor.id}`}>
              <Text
                fontSize={{ base: '10px', md: '14px' }}
                color="brandLinkColor"
                fontWeight="bold"
              >
                {getUsername(editor)}
              </Text>
            </Link>
          </Flex>
          <Text
            mt="4px !important"
            fontSize={{ base: '10px', md: '14px' }}
            opacity={0.4}
            whiteSpace="nowrap"
          >
            {translatedTimestamp}
          </Text>
        </Box>
      </Flex>
    </LinkBox>
  )
}

export default TrendingCategoryItem
