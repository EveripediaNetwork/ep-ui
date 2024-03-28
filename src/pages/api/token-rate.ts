import { env } from '@/env.mjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { ids, vs_currencies } = req.query as {
    ids: string
    vs_currencies: string
  }
  try {
    const result = await fetch(
      `https://pro-api.coingecko.com/api/v3/simple/price?vs_currencies=${
        vs_currencies ? vs_currencies : 'usd'
      }&ids=${ids ? ids : 'everipedia'}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-cg-pro-api-key': env.COINGECKO_API_KEY,
        },
      },
    )
    if (!result.ok) {
      throw new Error('Try again')
    }
    const data = await result.json()

    return res.status(200).json(data)
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: e,
    })
  }
}
