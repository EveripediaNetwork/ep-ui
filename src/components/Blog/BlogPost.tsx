import React from 'react'
import { Flex, LinkBox, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { BlogPostType } from '@/types/Blog'
import { Avatar } from '@/components/Elements'
import { useENSData } from '@/hooks/useENSData'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'

export const BlogPost = (props: BlogPostType) => {
  const { post, ...rest } = props
  const [, displayName] = useENSData(post.contributor)

  return (
    <LinkBox
      display="flex"
      flexDir="column"
      rounded="lg"
      shadow="xl"
      bg="white"
      _dark={{ bg: 'gray.700' }}
      overflowX="hidden"
      {...rest}
    >
      {post.cover_image ? (
        <Image
          h="52"
          src={post.cover_image}
          loading="lazy"
          alt={post.title}
          width="full"
          imgH={IMAGE_BOX_SIZE}
          imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
        />
      ) : null}
      <Flex h="fit-content" p="4" flexDir="column" flex="auto">
        <Flex flex="auto" align="center">
          <LinkOverlay href={`/blog/${post.digest}`}>
            <Text fontSize="lg" fontWeight="bold" noOfLines={3}>
              {post.title}
            </Text>
          </LinkOverlay>
        </Flex>
        <Flex mt={3} justifyContent="space-between">
          <Flex justifyContent="flex-start">
            <Avatar address={post.contributor} size={20} alt="unknown" />
            <Text
              color="brand.500"
              fontWeight="bold"
              fontSize="sm"
              marginLeft={2}
            >
              {displayName}
            </Text>
          </Flex>
          <Text
            fontSize="sm"
            color="gray.400"
            _dark={{ color: 'whiteAlpha.400' }}
          >
            {new Date((post.timestamp || 0) * 1000).toDateString()}
          </Text>
        </Flex>
      </Flex>
    </LinkBox>
  )
}
