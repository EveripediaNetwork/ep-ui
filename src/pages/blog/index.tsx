import { Box, chakra, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { GetStaticProps } from 'next'
import { getBlogsFromAllAccounts } from '@/utils/blog.utils'
import { Blog as BlogType } from '@/types/Blog'
import BlogHeader from '@/components/SEO/Blog'
import { store } from '@/store/store'
import { ArweaveApi } from '@/services/blog'
import BlogPageHeader from '@/components/Blog/BlogPageHeader'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const Blog = ({ blogEntries }: { blogEntries: BlogType[] }) => {
  return (
    <>
      <BlogHeader />
      <chakra.div bgColor="pageBg" my={-4} py={4}>
        <Box bgColor={'brand.50'} _dark={{ bgColor: 'brand.100' }}>
          <BlogPageHeader />
        </Box>
        <chakra.div
          w="min(90%, 1100px)"
          mx="auto"
          position={'relative'}
          top={{ base: '-75px', lg: -140 }}
        >
          <SimpleGrid
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
      ...(await serverSideTranslations(locale ?? 'en', ['blog', 'common'])),
      blogEntries: blogEntries ?? [],
    },
    revalidate: 60 * 5,
  }
}

export default Blog
