import { chakra, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { store } from '@/store/store'
import { useAppDispatch } from '@/store/hook'
import { setBlogs } from '@/store/slices/blog-slice'
import { GetServerSideProps } from 'next'
import { getBlogEntries, getRunningOperationPromises } from '@/services/blog'
import arweave from '@/config/arweave'
import { formatEntry } from '@/utils/formatEntry'

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

  const entryPaths = entries.data.transactions.edges
    .map(({ node }: any) => {
      const tags = Object.fromEntries(
        node.tags.map((tag: any) => [tag.name, tag.value]),
      )
      console.log(node.block.timestamp)

      return {
        slug: tags['Original-Content-Digest'],
        path: node.id,
        timestamp: node.block.timestamp,
      }
    })
    .filter((entry: any) => entry.slug && entry.slug !== '')
    .reduce((acc: any, current: any) => {
      const x = acc.findIndex((entry: any) => entry.slug === current.slug)
      if (x === -1) return acc.concat([current])

      acc[x].timestamp = current.timestamp

      return acc
    }, [])

  const blogEntries = (
    await Promise.all(
      entryPaths.map(async (entry: any) =>
        formatEntry(
          JSON.parse(
            String(await arweave.transactions.getData(entry.path, {
              decode: true,
              string: true,
            })),
          ),
          entry.slug,
          entry.timestamp,
        ),
      ),
    )
  )
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce((acc, current) => {
      const x = acc.find((entry: any) => entry.slug === current.slug)
      if (!x) return acc.concat([current])
      return acc
    }, [])

  // console.log(blogEntries)
  console.log(blogEntries)
  // console.log(entries.data.transactions.edges)

  return {
    props: {
      blogEntries,
    },
  }
}

export default Blog
