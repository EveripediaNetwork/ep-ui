import slugify from 'slugify'
import arweave from '@/config/arweave'
import { Blog, BlogTag, EntryPath, RawTransactions } from '@/types/Blog'

export const formatEntry = async (
  entry: any,
  transactionId: any,
  timestamp: any,
) => ({
  title: entry.content.title,
  slug: slugify(entry.content.title),
  body: entry.content.body,
  digest: entry.originalDigest ?? entry.digest,
  contributor: entry.authorship.contributor,
  transaction: transactionId,
  timestamp,
  cover_image:
    (entry.content.body
      .split('\n\n')[0]
      .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1] || null,
  image_sizes: 50,
})

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
  const status = await arweave.transactions.getStatus(entry.path)
  console.log(status)

  try {
    const result = await arweave.transactions.getData(entry.path, {
      decode: true,
      string: true,
    })

    if (result)
      return await formatEntry(
        JSON.parse(result as string),
        entry.slug,
        entry.timestamp,
      )

    return undefined
  } catch (error) {
    console.log(error)
  }

  return undefined
}

export const getBlogentriesFormatted = async (
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
      if (!x && current) return acc.concat([current])
      return acc
    }, [])
}
