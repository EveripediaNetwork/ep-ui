import React from 'react'
import { Flex, LinkBox, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { Blog } from '@/types/Blog'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { useENSData } from '@/hooks/useENSData'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'

type BlogPostType = {
  maxW?: string
  post: Blog
  key: number
}

export const BlogPost = ({ post, ...rest }: BlogPostType) => {
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
        <Image h="52" src={post.cover_image} loading="lazy" alt={post.title} />
      ) : null}
      <Flex h="fit-content" p="4" flexDir="column" flex="auto">
        <Flex justifyContent="flex-start">
          <DisplayAvatar address={post.contributor} size={20} alt="unknown" />
          <Text marginLeft={5}>{displayName}</Text>
        </Flex>
        <Flex flex="auto" align="center">
          <LinkOverlay href={`/blog/${post.digest}`}>
            <Text fontSize="2xl" fontWeight="bold" noOfLines={3}>
              {post.title}
            </Text>
          </LinkOverlay>
        </Flex>
        <Text color="gray.400" _dark={{ color: 'whiteAlpha.400' }}>
          {new Date((post.timestamp || 0) * 1000).toDateString()}
        </Text>
      </Flex>
    </LinkBox>
  )
}
