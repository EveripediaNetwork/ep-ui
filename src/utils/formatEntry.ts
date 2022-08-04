import slugify from 'slugify'

export const formatEntry = async (
  entry: any,
  transactionId: any,
  timestamp: any,
) => ({
  title: entry.content.title,
  slug: slugify(entry.content.title),
  body: entry.content.body,
  timestamp: new Date(timestamp * 1000),
  digest: entry.originalDigest ?? entry.digest,
  contributor: entry.authorship.contributor,
  transaction: transactionId,
  cover_image:
    (entry.content.body
      .split('\n\n')[0]
      .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1] || null,
  image_sizes: 50,
})
