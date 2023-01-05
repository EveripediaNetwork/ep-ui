import type { NextApiResponse } from 'next'

export default async function handler(res: NextApiResponse<string>) {
  const url = process.env.NEXT_PUBLIC_EP_API as string
  const result = await fetch(url)
  const response = await result.text()
  res.setHeader('Cache-Control', 's-maxage=60')
  return res.status(200).send(response)
}
