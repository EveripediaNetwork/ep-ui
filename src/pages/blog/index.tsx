import {
  chakra,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Link,
  Text,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { GetStaticProps } from 'next'
import { getBlogsFromAllAccounts } from '@/utils/blog.utils'
import { Blog as BlogType } from '@/types/Blog'
import BlogHeader from '@/components/SEO/Blog'
import { store } from '@/store/store'
import { ArweaveApi } from '@/services/blog'

export const Blog = ({ blogEntries }: { blogEntries: BlogType[] }) => {
  return (
    <>
      <BlogHeader />
      <chakra.div bgColor="pageBg" my={-8} py={4}>
        <chakra.div
          w="min(90%, 1100px)"
          mx="auto"
          my={{ base: '10', lg: '16' }}
        >
          <Flex
            wrap="wrap"
            justifyContent={['center', 'space-between']}
            my={4}
            minWidth={100}
          >
            <Heading as="h1" size="2xl" letterSpacing="wide">
              IQ.Wiki Blog
            </Heading>
            <Flex alignItems="center" mt={[5, 0]}>
              <Text mr={5}>More from us</Text>
              <Link
                href="https://mirror.xyz/0x3c1ccc207b3796D907B0024eD79fa2A11Af8D912"
                target="_blank"
              >
                <Image src="/images/logos/kr.svg" width={10} />
              </Link>
              <Link
                href="https://mirror.xyz/0xcd5Cc4F54C20C80aED2db81CBaf82153Fb95C1b1"
                target="_blank"
                ml={5}
              >
                <Image src="/images/logos/cn.svg" width={10} />
              </Link>
            </Flex>
          </Flex>
          <hr />
          <SimpleGrid
            mt={{ base: '15', md: '16' }}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX="5"
            spacingY="14"
          >
            {blogEntries && blogEntries.length > 0 ? (
              blogEntries.map((b, i: number) => <BlogPost post={b} key={i} />)
            ) : (
              <GridItem colSpan={3}>
                <Text fontSize="md" textAlign="center">
                  No entries so far...
                </Text>
              </GridItem>
            )}
          </SimpleGrid>
        </chakra.div>
      </chakra.div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogEntries = await getBlogsFromAllAccounts()
  await Promise.all(store.dispatch(ArweaveApi.util.getRunningQueriesThunk()))

  blogEntries?.sort((a, b) => {
    const Data =
      new Date(b.timestamp ? b.timestamp : '').valueOf() -
      new Date(a.timestamp ? a.timestamp : '').valueOf()
    return Data
  })

  return {
    props: {
      blogEntries,
    },
    revalidate: 60 * 60 * 7, // 7 hours
  }
}

export default Blog
