import React from 'react'
import { Flex, LinkBox, LinkBoxProps, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import type { BlogPost as BlogPostType } from '@/components/Blog/data'
import LinkOverlay from '../Elements/LinkOverlay/LinkOverlay'

export type BlogPostProps = { post: BlogPostType } & LinkBoxProps

export const BlogPost = (props: any) => {
  const { post, ...rest } = props

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
      {post.cover_image ? <Image h="52" src={post.cover_image} /> : null}
      <Flex h="fit-content" p="4" flexDir="column" flex="auto">
        <Flex flex="auto" align="center">
          <LinkOverlay href={`/blog/${post.digest}`} target="_blank">
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
