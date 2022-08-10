import slugify from 'slugify'
import arweave from '@/config/arweave'

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

export const getEntryPaths = (entries: any) => {
  return entries.data.transactions.edges
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
}

export const getBlogentriesFormatted = async (entryPaths: any) => {
  return (
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
}
