import slugify from 'slugify'
import arweave from '@/config/arweave'
import { Blog, BlogTag, EntryPath, RawTransactions } from '@/types/Blog'
import config from '@/config'
import { store } from '@/store/store'
import { getBlogs } from '@/services/blog/mirror'

export const formatEntry = async (
  blog: Partial<Blog>,
  transactionId: string,
  timestamp: number,
) => ({
  title: blog.title,
  slug: slugify(blog.title || ''),
  body: blog.body,
  digest: blog.digest,
  contributor: blog.contributor,
  transaction: transactionId,
  timestamp,
  cover_image: blog.body
    ? (blog.body
        .split('\n\n')[0]
        .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1]
    : null,
  image_sizes: 50,
})

export const formatBlog = (blog: any) => ({
  title: blog.title,
  slug: slugify(blog.title || ''),
  body: blog.body,
  digest: blog.digest,
  contributor: blog.publisher.project.address,
  timestamp: blog.timestamp,
  cover_image: blog.body
    ? (blog.body
        .split('\n\n')[0]
        .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1]
    : null,
  image_sizes: 50,
})

export const getBlogsFromAllAccounts = async () => {
  let blogs: Blog[] = []
  const accounts = [config.blogAccount2, config.blogAccount3]

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < accounts.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const { data: entries } = await store.dispatch(
      getBlogs.initiate(accounts[i]),
    )
    if (entries) blogs = [...blogs, ...entries.map((b: Blog) => formatBlog(b))]
  }

  return blogs
}

export const getEntryPaths = ({
  transactions,
}: RawTransactions): EntryPath[] => {
  return transactions.edges
    .map(({ node }) => {
      const tags = Object.fromEntries(
        node.tags.map((tag: BlogTag) => [tag.name, tag.value]),
      )

      if (!node || !node.block) return { slug: '', path: '', timestamp: 0 }

      return {
        slug: tags['Original-Content-Digest'],
        path: node.id,
        timestamp: node.block.timestamp,
      }
    })
    .filter(entry => entry.slug && entry.slug !== '')
    .reduce((acc: EntryPath[], current) => {
      const x = acc.findIndex((entry: EntryPath) => entry.slug === current.slug)
      if (x === -1) return acc.concat([current])

      acc[x].timestamp = current.timestamp

      return acc
    }, [])
}

const mapEntry = async (entry: EntryPath) => {
  try {
    const result = await arweave.transactions.getData(entry.path, {
      decode: true,
      string: true,
    })

    const parsedResult = JSON.parse(result as string)
    const {
      content: { title, body },
      digest,
      authorship: { contributor },
      transactionId,
    } = parsedResult

    if (result) {
      const formattedEntry = await formatEntry(
        { title, body, digest, contributor, transaction: transactionId },
        entry.slug,
        entry.timestamp || 0,
      )

      if (!formattedEntry.cover_image) formattedEntry.cover_image = null

      return formattedEntry
    }

    return undefined
  } catch (error) {
    console.error(error)
  }

  return undefined
}

export const getBlogEntriesFormatted = async (
  entryPaths: EntryPath[],
): Promise<Blog[]> => {
  return (
    await Promise.all(
      entryPaths.map(async (entry: EntryPath) => mapEntry(entry)),
    )
  )
    .sort((a, b) => {
      if (a && b) return b.timestamp - a.timestamp

      return 0
    })
    .reduce((acc: Blog[], current) => {
      const x = acc.find(
        (entry: Blog) => current && entry.slug === current.slug,
      )
      if (!x && current) return acc.concat([current as Blog])
      return acc
    }, [])
}
