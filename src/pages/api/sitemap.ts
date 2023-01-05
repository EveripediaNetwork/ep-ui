import config from '@/config'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const apiUrl = config.graphqlUrl.replace('/graphql', '')
  const url = `${apiUrl}/sitemap.xml`
  const result = await fetch(url, {
    headers: {
      Accept: 'text/xml',
    },
  })
  const response = await result.text()
  res.setHeader('Cache-Control', 's-maxage=60')
  return res.status(200).send(response)
}
