import React from 'react'
import { Flex, LinkBox, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { Blog } from '@/types/Blog'
import { Avatar } from '@/components/Elements'
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
            <Text color="brand.500" fontWeight="bold" fontSize="sm" marginLeft={2}>{displayName}</Text>
          </Flex>
          <Text fontSize="sm" color="gray.400" _dark={{ color: 'whiteAlpha.400' }}>
            {new Date((post.timestamp || 0) * 1000).toDateString()}
          </Text>
        </Flex>
      </Flex>
    </LinkBox>
  )
}
