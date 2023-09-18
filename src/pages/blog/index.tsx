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
  console.log(blogEntries)
  return (
    <>
      <BlogHeader />
      <chakra.div bgColor="pageBg" my={-8} py={4}>
        <Flex
          py={{ md: 20, base: 24 }}
          w={{ lg: '80%', md: '80%', base: '95%', '2xl': '80%' }}
          mx="auto"
          flexDir="column"
          alignItems="center"
        >
          <Heading
            fontSize={{ md: '4xl', base: '2xl', xl: '5xl' }}
            mb={{ base: 4 }}
            fontWeight={'600'}
          >
            IQ.wiki Blog
          </Heading>
          <Text
            fontSize={{ xl: 'xl', md: 'lg', base: 'md' }}
            textAlign="center"
            maxW={'743px'}
          >
            Bringing you all the latest from IQ.wiki, IQ token and BrainDAO.
          </Text>
          <Flex
            justifyContent={['center', 'space-between']}
            my={4}
            minWidth={100}
          >
            <Text
              fontSize={{ xl: 'xl', md: 'lg', base: 'md' }}
              letterSpacing="wide"
            >
              Our blog in KR and CHN:
            </Text>
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
        </Flex>
        <chakra.div
          w="min(90%, 1100px)"
          mx="auto"
          my={{ base: '10', lg: '16' }}
        >
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
    revalidate: 60 * 5,
  }
}

export default Blog
