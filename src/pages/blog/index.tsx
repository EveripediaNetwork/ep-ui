import { chakra, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { store } from '@/store/store'
import { useAppDispatch } from '@/store/hook'
import { setBlogs } from '@/store/slices/blog-slice'
import { GetServerSideProps } from 'next'
import { getBlogEntries, getRunningOperationPromises } from '@/services/blog'
import { getBlogentriesFormatted, getEntryPaths } from '@/utils/blog.utils'

export const Blog = ({ blogEntries }: any) => {
  const [mounted, setMounted] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (blogEntries) dispatch(setBlogs(blogEntries))
  }, [blogEntries])

  if (!mounted) return null

  return (
    <chakra.div bgColor="pageBg" my={-8} py={8}>
      <chakra.div w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Everipedia Blog
        </Heading>
        <SimpleGrid
          mt={{ base: '15', md: '16' }}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="5"
          spacingY="14"
        >
          {blogEntries
            ? blogEntries.map((b: any, i: number) => (
                <BlogPost post={b} key={i} />
              ))
            : null}
        </SimpleGrid>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const publicationInfo = await store.dispatch(
  //   getPublicationInfo.initiate('m1guelpf.eth'),
  // )

  const entries = await store.dispatch(
    getBlogEntries.initiate(['0xAe65930180ef4d86dbD1844275433E9e1d6311ED']),
  )

  await Promise.all(getRunningOperationPromises())

  const entryPaths = getEntryPaths(entries)
  console.log(entryPaths)

  const blogEntries = await getBlogentriesFormatted(entryPaths)

  return {
    props: {
      blogEntries,
    },
  }
}

export default Blog
