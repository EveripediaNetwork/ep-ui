import React from 'react'
import { MdKeyboardBackspace as LeftArrow } from 'react-icons/md'
import {
  Box,
  Button,
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
import { useENSData } from '@/hooks/useENSData'
import { Avatar } from '@/components/Elements'
import { GetStaticPaths, GetStaticProps } from 'next'

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
  const [, displayName] = useENSData(blog.contributor)

  return (
    <>
      <chakra.div bgColor="blogPageBg" my={-8} py={4}>
        <chakra.div
          w="min(90%, 1100px)"
          mx="auto"
          my={{ base: '10', lg: '16' }}
        >
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
              >
                <LeftArrow style={{ marginRight: '5px', fontSize: '20px' }} />{' '}
                <Text textColor="#718096" fontSize="md">
                  Go Back to Blog Page
                </Text>
              </Box>
              <Heading
                my={4}
                as="h1"
                fontSize={{ base: '3xl', lg: '5xl' }}
                letterSpacing="wide"
              >
                {blog.title}
              </Heading>
              <Link
                target="_blank"
                href={`https://mirror.xyz/${blog.contributor}`}
              >
                <Flex mb={4} justifyContent="flex-start">
                  <Avatar address={blog.contributor} size={20} alt="unknown" />
                  <Text marginLeft={5}>{displayName}</Text>
                </Flex>
              </Link>
              <Text color="gray.600" mb={3} _dark={{ color: 'gray.400' }}>
                {new Date((blog.timestamp || 0) * 1000).toDateString()}
              </Text>

              <ReactMarkdown
                components={components}
                transformLinkUri={uriTransformer}
              >
                {blog.body}
              </ReactMarkdown>
            </>
          ) : null}
          <Stack
            spacing="15"
            mt="12"
            sx={{
              p: {
                lineHeight: '26px',
              },
            }}
          >
            <Stack
              alignItems="center"
              spacing={{ base: 2, md: 4, lg: 8 }}
              px={{ base: 4, md: 14, lg: '24' }}
              py="8"
              bg="gray.100"
              _dark={{ bg: 'gray.700' }}
              rounded="lg"
            >
              <Text
                fontWeight="bold"
                fontSize={{ base: 'sm', md: 'md', lg: '3xl' }}
                textAlign="center"
              >
                Join thousands of others in receiving the most interesting wikis
                on IQ.Wiki every week
              </Text>
              <Button
                as="a"
                fontSize={{ base: 'xs', md: 'md', lg: 'inherit' }}
                px={{ base: '8', lg: 10 }}
                href="https://www.getdrip.com/forms/505929689/submissions/new"
                target="_blank"
                w="fit-content"
                maxW="fit-content"
              >
                Sign me up
              </Button>
            </Stack>
            {blogEntries.length > 1 ? (
              <Stack spacing="8">
                <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
                  You might like
                </Text>
                <SimpleGrid
                  alignSelf="center"
                  w="full"
                  mt={{ base: '15', md: '16' }}
                  columns={{ base: 2, md: 3 }}
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

export const getStaticProps: GetStaticProps = async context => {
  const digest: string = context.params?.digest as string
  const result = await store.dispatch(getEntry.initiate(digest))
  const blog = formatBlog(result.data?.entry as Blog)

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
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default BlogPostPage
