import React from 'react'
import { MdKeyboardBackspace as LeftArrow } from 'react-icons/md'
import {
  Box,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react'
import { store } from '@/store/store'
import { formatBlog, getBlogsFromAllAccounts } from '@/utils/blog.utils'
import ReactMarkdown from 'react-markdown'
import { components, uriTransformer } from '@/components/Blog/BlogMdComponents'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { BlogPost } from '@/components/Blog/BlogPost'
import { Blog } from '@/types/Blog'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { getEntry } from '@/services/blog/mirror'
import { Avatar } from '@/components/Elements'
import { GetStaticPaths, GetStaticProps } from 'next'
import BlogBanner from '@/components/Blog/BlogBanner'

const BlogContentOverride =
  /!\[ \]\((https?:\/\/.*\.(?:png|jpg|svg|gif|jpeg))\?height=\d*\\&width=\d*\)/

export const BlogPostPage = ({
  blog,
  blogEntries,
}: {
  blog: Blog
  blogEntries: Blog[]
}) => {
  const router = useRouter()

  return (
    <>
      <chakra.div bgColor="blogPageBg" my={-8} py={4}>
        <chakra.div
          w="min(90%, 1100px)"
          mx="auto"
          my={{ base: '10', lg: '16' }}
        >
          <chakra.div w={'min(90%, 858px)'} mx={'auto'}>
            {blog ? (
              <>
                <NextSeo
                  title={blog.title}
                  description={`${blog.title} - ${blog.body
                    .replace(BlogContentOverride, '')
                    .slice(0, 200)
                    .trim()}...`}
                  openGraph={{
                    title: blog.title,
                    description: `${blog.title} - ${blog.body
                      .replace(BlogContentOverride, '')
                      .slice(0, 200)
                      .trim()}...`,
                    images: [{ url: String(blog.cover_image) }],
                  }}
                />
                <Box
                  onClick={() => router.push('/blog')}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  cursor={'pointer'}
                >
                  <LeftArrow style={{ marginRight: '5px', fontSize: '20px' }} />{' '}
                  <Text
                    color={'gray.600'}
                    _dark={{ color: 'whiteAlpha.800' }}
                    fontSize="md"
                  >
                    Blog
                  </Text>
                </Box>
                <Heading
                  my={4}
                  as="h1"
                  fontWeight={'600'}
                  fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}
                  letterSpacing="wide"
                >
                  {blog.title}
                </Heading>
                <Link
                  target="_blank"
                  href={`https://mirror.xyz/${blog.contributor}`}
                >
                  <Flex
                    mb={4}
                    justifyContent="flex-start"
                    gap={2}
                    align={'center'}
                  >
                    <Avatar
                      address={blog.contributor}
                      size={20}
                      alt="unknown"
                    />
                    <Text
                      color="gray.600"
                      fontSize={{ base: 'sm', lg: 'md' }}
                      _dark={{ color: 'whiteAlpha.800' }}
                    >
                      {new Date((blog.timestamp || 0) * 1000).toDateString()}
                    </Text>
                  </Flex>
                </Link>
                <ReactMarkdown
                  components={components}
                  transformLinkUri={uriTransformer}
                >
                  {blog.body}
                </ReactMarkdown>
              </>
            ) : null}
          </chakra.div>
          <Stack
            spacing="15"
            mt="12"
            sx={{
              p: {
                lineHeight: '26px',
              },
            }}
          >
            <BlogBanner />
            {blogEntries.length > 1 ? (
              <Stack spacing="8">
                <Text
                  as="span"
                  fontSize="3xl"
                  fontWeight="semibold"
                  noOfLines={3}
                >
                  More from IQ wiki
                </Text>
                <SimpleGrid
                  alignSelf="center"
                  w="full"
                  mt={{ base: '15', md: '16' }}
                  columns={{ md: 2, lg: 3 }}
                  spacingX="5"
                  spacingY="14"
                >
                  {blogEntries
                    .filter((bp: Blog) => bp.digest !== blog?.digest)
                    .slice(0, 3)
                    .map((b: Blog, i: number) => (
                      <BlogPost maxW="420px" post={b} key={i} />
                    ))}
                </SimpleGrid>
              </Stack>
            ) : null}
          </Stack>
        </chakra.div>
      </chakra.div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const digest: string = context.params?.digest as string
  const result = await store.dispatch(getEntry.initiate(digest))
  const blog = formatBlog(result.data?.entry as Blog, true)

  blog.body = String(
    await unified()
      .use(remarkParse) // Parse markdown
      .use(remarkStringify) // Serialize markdown
      .process(blog.body as string),
  )

  const blogEntries = await getBlogsFromAllAccounts()

  return {
    props: {
      blog,
      blogEntries,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default BlogPostPage
