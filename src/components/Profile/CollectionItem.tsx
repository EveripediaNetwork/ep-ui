import {
  AspectRatio,
  chakra,
  Divider,
  Flex,
  Icon,
  LinkBox,
  Text,
  LinkOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import NextLink from 'next/link'

import { getReadableDate } from '@/utils/getFormattedDate'
import { shortenText } from '@/utils/shortenText'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'

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
          <WikiImage image={item.images?.[0]?.id} w="full" />
        </AspectRatio>
        <Flex direction="column" px="3" fontSize="xs" py="2" mb="3">
          <Flex align="center">
            <NextLink href={`/wiki/${id}`} passHref>
              <LinkOverlay>
                <chakra.span color="gray.500"> {title}</chakra.span>
              </LinkOverlay>
            </NextLink>
            {updated && (
              <>
                <chakra.span ml="auto" color="gray.500">
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
