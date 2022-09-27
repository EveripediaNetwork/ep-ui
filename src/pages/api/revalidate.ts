import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.REVALIDATE_PAGES_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  if (!req.query.path) {
    return res.status(400).json({ message: 'Missing path' })
  }
  const path = decodeURIComponent(req.query.path as string)
  if (!path.startsWith('/')) {
    return res.status(400).json({ message: 'Invalid path' })
  }
  try {
    await res.revalidate(path)
    return res.json({ revalidated: true, path })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
