import { chakra, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { store } from '@/store/store'
import { useAppDispatch } from '@/store/hook'
import { setBlogs } from '@/store/slices/blog-slice'
import { GetServerSideProps } from 'next'
import { getBlogEntries, getRunningOperationPromises } from '@/services/blog'
import { getBlogentriesFormatted, getEntryPaths } from '@/utils/blog.utils'
import { EntryPath, Blog as BlogType } from '@/types/Blog'
import config from '@/config'

export const Blog = ({ blogEntries }: { blogEntries: BlogType[] }) => {
  const [mounted, setMounted] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (mounted === false) {
      dispatch(setBlogs(blogEntries))
      setMounted(true)
    }
  }, [mounted])

  return (
    <chakra.div bgColor="pageBg" my={-8} py={4}>
      <chakra.div w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading my={12} as="h1" size="2xl" letterSpacing="wide">
          Everipedia Blog
        </Heading>
        <SimpleGrid
          mt={{ base: '15', md: '16' }}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="5"
          spacingY="14"
        >
          {blogEntries
            ? blogEntries.map((b, i: number) => <BlogPost post={b} key={i} />)
            : null}
        </SimpleGrid>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const entries = await store.dispatch(
    getBlogEntries.initiate([
      // config.blogAccount,
      config.blogAccount2,
      config.blogAccount3,
    ]),
  )

  await Promise.all(getRunningOperationPromises())

  if (!entries.data) return { props: {} }

  const entryPaths: EntryPath[] = getEntryPaths(entries.data)

  const blogEntries = await getBlogentriesFormatted(entryPaths)

  return {
    props: {
      blogEntries,
    },
  }
}

export default Blog
