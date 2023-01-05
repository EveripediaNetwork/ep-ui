import type {NextApiResponse } from 'next'

export default async function handler(
  res: NextApiResponse<string>,
) {
  const url = `https://api.dev.braindao.org/sitemap.xml`
  const result = await fetch(url)
  const response = await result.text()
  res.setHeader('Cache-Control', 's-maxage=60')
  return res.status(200).send(response)
}

