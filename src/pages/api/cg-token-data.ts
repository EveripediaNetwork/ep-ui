import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  prices?: {
    name: string
    amt: number
  }[]
  last_price?: number
  last_market_cap?: number
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

    const lastPrice = response.prices[response.prices.length - 1][1]
    const lastMarketCap =
      response.market_caps[response.market_caps.length - 1][1]

    const transformedPrices = response.prices.map(
      ([timestamp, price]: [number, number]) => ({
        name: timestamp,
        amt: price,
      }),
    )

    const data: ResponseData = {
      prices: transformedPrices,
      last_price: lastPrice,
      last_market_cap: lastMarketCap,
      total_volumes: response.total_volumes,
      status: true,
      message: 'Data fetched successfully',
    }

    // Set Cache-Control header to cache the response for 5 minutes (300 seconds)
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
