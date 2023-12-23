import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { BlogPostType } from '@/types/Blog'
import { Avatar } from '@/components/Elements'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { TbArrowUpRight } from 'react-icons/tb'
import { LinkWrapper } from '../Elements/LinkElements/LinkWrapper'
import ReactMarkdown from 'react-markdown'
import { postComponent } from './BlogPostMdComponents'

export const BlogPost = (props: BlogPostType) => {
  const { post, ...rest } = props

  return (
    <LinkWrapper href={`/blog/${post.digest}`}>
      <Box
        display="flex"
        flexDir="column"
        rounded="lg"
        border={'1px'}
        borderColor={'gray.200'}
        bg="white"
        transition="all 0.3s"
        _hover={{
          transform: 'scale(1.02)',
        }}
        _dark={{ bg: 'gray.700', borderColor: 'whiteAlpha.400' }}
        overflowX="hidden"
        cursor={'pointer'}
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
        <Flex
          h="fit-content"
          px="3"
          pt={4}
          pb={7}
          flexDir="column"
          flex={'auto'}
          gap={4}
        >
          <Flex gap={3}>
            <Avatar address={post.contributor} size={20} alt="unknown" />
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: 'whiteAlpha.800' }}
            >
              {new Date((post.timestamp ?? 0) * 1000).toDateString()}
            </Text>
          </Flex>
          <Box flexGrow={1}>
            <Flex align="center" mb={2}>
              <Text fontSize="lg" fontWeight="semibold" noOfLines={3}>
                {post.title}
              </Text>
            </Flex>
            <ReactMarkdown components={postComponent}>
              {post.excerpt ?? ''}
            </ReactMarkdown>
          </Box>
          <LinkWrapper href={`/blog/${post.digest}`}>
            <Flex gap={2} align={'center'}>
              <Text
                fontSize={{ base: 'sm' }}
                textAlign="center"
                color={'brand.500'}
              >
                Read Post
              </Text>
              <TbArrowUpRight color="#FF5CAA" />
            </Flex>
          </LinkWrapper>
        </Flex>
      </Box>
    </LinkWrapper>
  )
}
