import slugify from 'slugify'

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
