import { BLOG_POSTS } from '@/components/Blog/data'
import { chakra, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import slugify from 'slugify'
import {
  getBlogEntries,
  getPublicationInfo,
  getRunningOperationPromises,
} from '@/services/blog'
import arweave from '@/config/arweave'

const formatEntry = async (entry: any, transactionId: any, timestamp: any) => ({
  title: entry.content.title,
  slug: slugify(entry.content.title),
  body: entry.content.body,
  timestamp,
  digest: entry.originalDigest ?? entry.digest,
  contributor: entry.authorship.contributor,
  transaction: transactionId,
  cover_image:
    (entry.content.body
      .split('\n\n')[0]
      .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1] || null,
  image_sizes: 50,
})

export const Blog = () => {
  const [mounted, setMounted] = useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

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
          {BLOG_POSTS.map((post, i) => (
            <BlogPost post={post} key={i} />
          ))}
        </SimpleGrid>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const publicationInfo = await store.dispatch(
    getPublicationInfo.initiate('m1guelpf.eth'),
  )

  const entries = await store.dispatch(
    getBlogEntries.initiate(['0xE340b00B6B622C136fFA5CFf130eC8edCdDCb39D']),
  )

  await Promise.all(getRunningOperationPromises())

  const entryPaths = entries.data.transactions.edges
    .map(({ node }: any) => {
      const tags = Object.fromEntries(
        node.tags.map((tag: any) => [tag.name, tag.value]),
      )

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

  const result = (
    await Promise.all(
      entryPaths.map(async (entry: any) =>
        formatEntry(
          JSON.parse(
            String(
              await arweave.transactions.getData(entry.path, {
                decode: true,
                string: true,
              }),
            ),
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

  console.log(result)
  console.log(publicationInfo)
  // console.log(entries.data.transactions.edges)

  return {
    props: {
      entries,
    },
  }
}

export default Blog
