import {
  AspectRatio,
  chakra,
  Divider,
  Flex,
  Icon,
  LinkBox,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

import { getReadableDate } from '@/utils/getFormattedDate'
import { shortenText } from '@/utils/shortenText'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'

export type CollectionItemProps = {
  item: Wiki
}

export const CollectionItem = (props: CollectionItemProps) => {
  const { item } = props
  const { updated, content, title, id } = item

  return (
    <LinkBox>
      <Flex
        shadow="base"
        _hover={{ shadow: 'lg' }}
        direction="column"
        rounded="2xl"
        overflow="hidden"
        _dark={{ bg: '#303339' }}
      >
        <AspectRatio maxW="full" ratio={1}>
          <WikiImage
            imageURL={getWikiImageUrl(item.images)}
            w="full"
            alt={item.title}
          />
        </AspectRatio>
        <Flex direction="column" px="3" fontSize="xs" py="2" mb="3">
          <Flex align="center">
            <LinkOverlay href={`/wiki/${id}`}>
              <chakra.span color="fadedText2"> {title}</chakra.span>
            </LinkOverlay>
            {updated && (
              <>
                <chakra.span ml="auto" color="fadedText2">
                  Last Updated:
                </chakra.span>
                <chakra.span>{getReadableDate(updated)}</chakra.span>
              </>
            )}
          </Flex>
          <Text noOfLines={1}>{shortenText(content, 65)}</Text>
        </Flex>
        <Divider />
        <Flex px="3" align="center" py="2">
          <FaEthereum />
          <Icon as={RiHeartLine} ml="auto" />
          <chakra.span ml="2">0</chakra.span>
        </Flex>
      </Flex>
    </LinkBox>
  )
}
