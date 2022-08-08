// import {
//   BlogPost as BlogPostType,
// } from '@/components/Blog/data'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import arweave from '@/config/arweave'
import {
  Button,
  chakra,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
// import { BlogPost } from '@/components/Blog/BlogPost'
// import { Image } from '@/components/Elements/Image/Image'
import { useAppSelector } from '@/store/hook'
import { Blog } from '@/store/slices/blog-slice'
import { store } from '@/store/store'
import { getSingleBlogEntry } from '@/services/blog'
import { formatEntry } from '@/utils/formatEntry'
import ReactMarkdown from 'react-markdown'
import { components, uriTransformer } from '@/components/Blog/BlogMdComponents'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

// type BlogPostProps = NextPage & {
//   post: BlogPostType
//   postSuggestions: BlogPostType[]
// }

export const BlogPostPage = ({ digest }: any) => {
  // const { post, postSuggestions } = props

  const blogResult = useAppSelector(state =>
    state.blog && digest
      ? Object.values(state.blog).find(b => b.digest === digest)
      : null,
  )

  const [blog, setBlog] = useState<Blog | undefined | null>(blogResult)

  useEffect(() => {
    console.log(blogResult)
    if (!blogResult) {
      const getBlogEntry = async () => {
        const {
          data: {
            transactions: {
              edges: {
                0: {
                  node: {
                    id: transactionId,
                    block: { timestamp },
                  },
                },
              },
            },
          },
        } = await store.dispatch(getSingleBlogEntry.initiate(digest))
        // console.log(await store.dispatch(getSingleBlogEntry.initiate(digest)))

        const formatted = await formatEntry(
          JSON.parse(
            String(
              await arweave.transactions.getData(transactionId, {
                decode: true,
                string: true,
              }),
            ),
          ),
          transactionId,
          timestamp,
        )

        formatted.body = await unified()
          .use(remarkParse) // Parse markdown
          .use(remarkStringify) // Serialize markdown
          .process(formatted.body)

        formatted.body = String(formatted.body)
        console.log(formatted.body)

        setBlog(formatted)
      }

      getBlogEntry()
    }
  }, [blogResult])

  return (
    <chakra.div bgColor="pageBg" my={-8} py={8}>
      <chakra.div
        w="min(90%, 1100px)"
        px={{ lg: '44' }}
        mx="auto"
        my={{ base: '10', lg: '16' }}
      >
        {blog ? (
          <>
            <Heading
              mt={8}
              mb={4}
              as="h1"
              fontSize={{ base: '3xl', lg: '5xl' }}
              letterSpacing="wide"
            >
              {blog.title}
            </Heading>
            <Text color="gray.600" mb={3} _dark={{ color: 'gray.400' }}>
              {new Date((blog.timestamp || 0) * 1000).toDateString()}
            </Text>

            {/* <Image
              h={{ base: '300px', md: '393px' }}
              src={blog.cover_image}
              mt="14"
            /> */}

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
            bg="gray.300"
            _dark={{ bg: 'whiteAlpha.200' }}
            rounded="lg"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: 'sm', md: 'md', lg: '3xl' }}
              textAlign="center"
            >
              Join thousands of others in receiving the most interesting wikis
              on Everipedia every week
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

          <Stack spacing="8">
            <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
              You might like
            </Text>
            <SimpleGrid
              alignSelf="center"
              w="fit-content"
              mt={{ base: '15', md: '16' }}
              columns={{ base: 1, md: 2 }}
              spacingX="5"
              spacingY="14"
            >
              {/* {postSuggestions.slice(-2).map((blogPost, i) => (
                <BlogPost maxW="420px" post={blogPost} key={i} />
              ))} */}
            </SimpleGrid>
          </Stack>
        </Stack>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const digest: string = context.params?.digest as string
  return {
    props: {
      digest,
    },
  }
}

export default BlogPostPage
