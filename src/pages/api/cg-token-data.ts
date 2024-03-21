import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  prices?: number[][]
  market_caps?: number[][]
  total_volumes?: number[][]
  status: boolean
  message: string
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const url =
    'https://api.coingecko.com/api/v3/coins/everipedia/market_chart?vs_currency=usd&days=7'

  try {
    const result = await fetch(url)
    const response = await result.json()

    const data: ResponseData = {
      prices: response.prices,
      market_caps: response.market_caps,
      total_volumes: response.total_volumes,
      status: true,
      message: 'Data fetched successfully',
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate',
    )

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res.status(500).json({
      status: false,
      message: 'Error fetching data',
    })
  }
}
